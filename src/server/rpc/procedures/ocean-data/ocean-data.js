/**
 * The OceanData service provides access to scientific ocean data including
 * temperature and sea level.
 *
 * For more information, check out:
 *              http://www.columbia.edu/~mhs119/Sensitivity+SL+CO2/
 *     https://www.paleo.bristol.ac.uk/~ggdjl/warm_climates/hansen_etal.pdf.
 *
 * @service
 */
const path = require('path');
const fs = require('fs');

const OceanData = {};
OceanData._data = fs.readFileSync(path.join(__dirname,'Table.txt'), 'utf8')
    .split('\n')
    .map(function (line) {
        let year = 2000 - line.substring(0, 7) * 1000000;
        let oxygenIsotopeRatio = line.substring(8, 14);
        let deepOceanTemp = line.substring(16, 22);
        let surfaceTemp = line.substring(24, 30);
        let seaLevel = line.substring(32, 38).trim();
        return {year, oxygenIsotopeRatio, deepOceanTemp, surfaceTemp, seaLevel};
    });

/**
 * Get historical oxygen isotope ratio values by year.
 *
 * @returns {Array} ratios - a list of oxygen isotope ratios by year
 */
OceanData.getOxygenRatio = function(){
    return this._data
        .map(data => [data.year, data.oxygenIsotopeRatio]);
};

/**
 * Get historical deep ocean temperatures by year.
 *
 * @returns {Array} temperatures - a list of deep ocean temperatures by year
 */
OceanData.getDeepOceanTemp = function(){
    return this._data
        .map(data => [data.year, data.deepOceanTemp]);
};

/**
 * Get historical surface ocean temperatures by year.
 *
 * @returns {Array} temperatures - a list of surface ocean temperatures by year
 */
OceanData.getSurfaceTemp = function(){
    return this._data
        .map(data => [data.year, data.surfaceTemp]);
};

/**
 * Get historical sea level in meters by year.
 *
 * @returns {Array} meters - change in sea level (in meters) by year
 */
OceanData.getSeaLevel = function(){
    return this._data
        .map(data => [data.year, data.seaLevel]);
};

module.exports = OceanData;
