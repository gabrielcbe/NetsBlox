/**
 * The ThingSpeak Service provides access to the ThingSpeak IoT analytics platform.
 * For more information, check out https://thingspeak.com/.
 *
 * Terms of use: https://thingspeak.com/pages/terms
 * @service
 */
const ApiConsumer = require('../utils/api-consumer');
const thingspeakIoT = new ApiConsumer('Thingspeak',
    'https://api.thingspeak.com/channels/');
const rpcUtils = require('../utils');

let feedParser = data => {
    let fieldMap = {};
    let channel = data.channel;
    for (var prop in channel) {
        if (channel.hasOwnProperty(prop) && prop.match(/field\d/)) {
            var matchGroup = prop.match(/field\d/)[0];
            fieldMap[matchGroup] = channel[matchGroup];
        }
    }
    return data.feeds.map(entry => {
        let resultObj = {
            Time: new Date(entry.created_at),
        };
        for (let field in fieldMap) {
            if (fieldMap.hasOwnProperty(field)) {
                resultObj[fieldMap[field]] = entry[field];
            }
        }
        return resultObj;
    });
};

let detailParser = item => {
    let metaData = {
        id: item.id,
        name: item.name,
        description: item.description,
        created_at: new Date(item.created_at),
        latitude: item.latitude,
        longitude: item.longitude,
        tags: (function(data) {
            return data.map(tag => {
                return tag.name;
            });
        })(item.tags),
    };
    if (!metaData.latitude || !metaData.longitude || metaData.latitude == 0.0){
        delete metaData.latitude;
        delete metaData.longitude;
    }
    return metaData;
};

let searchParser = responses => {
    let searchResults = responses.map(data => data.channels.map( item => {
        let details = detailParser(item);
        if (!details.latitude) return null;
        return details;
    })).reduce((results, singleRes) => results.concat(singleRes), []);
    return searchResults;
};

thingspeakIoT._paginatedQueryOpts = function(queryOpts, limit) {
    return this._requestData(queryOpts).then(resp => {
        const perPage = resp.pagination.per_page;
        const availablePages = Math.ceil(resp.pagination.total_entries / perPage);
        const pages = Math.min(availablePages, Math.ceil(limit/perPage));
        let queryOptsList = [];
        for(let i = 1; i <= pages; i++){
            const options = Object.assign({}, queryOpts);
            options.queryString += `&page=${i}`;
            queryOptsList.push(options);
        }
        return queryOptsList;
    });
};

/**
 * Search for ThingSpeak channels by tag.
 *
 * @param {String} tag
 * @param {Number=} limit
 */
thingspeakIoT.searchByTag = function(tag, limit) {
    let queryOptions = {
        path: 'public.json',
        queryString: tag && rpcUtils.encodeQueryData({
            tag: encodeURIComponent(tag),
        }),
    };
    limit = limit || 15;
    return this._paginatedQueryOpts(queryOptions, limit).then(queryOptsList => {
        return this._sendStruct(queryOptsList, searchParser);
    });
};

/**
 * Search for channels by location.
 *
 * @param {Latitude} latitude
 * @param {Longitude} longitude
 * @param {Number=} distance
 * @param {Number=} limit
 */
thingspeakIoT.searchByLocation = function(latitude, longitude, distance, limit) {
    let queryOptions = {
        path: 'public.json',
        queryString: '?' +
            rpcUtils.encodeQueryData({
                latitude: latitude,
                longitude: longitude,
                distance: !distance ? 100 : distance
            }),
    };
    limit = limit || 15;
    return this._paginatedQueryOpts(queryOptions, limit).then(queryOptsList => {
        return this._sendStruct(queryOptsList, searchParser);
    });};

/**
 * Search for channels by tag and location.
 *
 * @param {String} tag
 * @param {Latitude} latitude
 * @param {Longitude} longitude
 * @param {Number=} distance
 */
thingspeakIoT.searchByTagAndLocation= function(tag, latitude, longitude, distance) {
    let queryOptions = {
        path: 'public.json',
        queryString: '?' +
        rpcUtils.encodeQueryData({
            latitude: latitude,
            longitude: longitude,
            distance: !distance ? 100 : distance
        })
    };
    return this._paginatedQueryOpts(queryOptions, 10000).then(queryOptsList => {
        return this._requestData(queryOptsList).then( resultsArr => {
            let results = searchParser(resultsArr).filter(item => item.tags.some(item => item.toLowerCase().indexOf(tag) !== -1));
            this._logger.info('responding with', results.length, 'results');
            return rpcUtils.jsonToSnapList(results);
        });
    });};

/**
 * Get channel feed.
 *
 * @param {String} id
 * @param {Number} numResult
 */
thingspeakIoT.channelFeed = function(id, numResult) {
    let queryOptions = {
        path: id + '/feeds.json',
        queryString: '?' + rpcUtils.encodeQueryData({
            results: numResult,
        }),
    };
    return this._sendStruct(queryOptions, feedParser);
};

/**
 * Request data from a private channel
 *
 * @param {String} id ID of the private channel feed
 * @param {Number} numResult Number of results to fetch
 * @param {String} apiKey Thingspeak API key
 */
thingspeakIoT.privateChannelFeed = function(id, numResult, apiKey) {
    let queryOptions = {
        path: id + '/feeds.json',
        queryString: '?' + rpcUtils.encodeQueryData({
            api_key: apiKey,
            results: numResult,
        }),
    };
    return this._sendStruct(queryOptions, feedParser);
};

/**
 * Get various details about the channel, including location, fields, tags and name.
 * @param {Number} id channel ID
 * @returns {Object} Channel details.
 */

thingspeakIoT.channelDetails = async function(id) {
    const data = await this._requestData({path: id + '.json'});
    let details = detailParser(data);
    const options = {
        path: id + '/feeds.json',
        queryString: '?results=10'
    };
    const resp = await this._requestData(options);
    details.updated_at = new Date(resp.channel.updated_at);
    details.total_entries = resp.channel.last_entry_id;
    details.fields = [];
    for(let prop in resp.channel) {
        if (resp.channel.hasOwnProperty(prop) && prop.match(/field\d/)) {
            let match = prop.match(/field\d/)[0];
            details.fields.push(resp.channel[match]);
        }
    }
    details.feeds = feedParser(resp);
    this._logger.info(`channel ${id} details`, details);
    return rpcUtils.jsonToSnapList(details);
};

module.exports = thingspeakIoT;
