/**
 * Access to NOAA Earth System Research Laboratory data collected from Mauna Loa, Hawaii.
 *
 * See https://www.esrl.noaa.gov/gmd/ccgg/trends/ for additional details.
 *
 * @service
 * @category Science
 * @category Climate
 */
const data = (function() {
    const fs = require('fs');
    const path = require('path');
    const filename = path.join(__dirname,'co2_mm_mlo.txt');
    const lines = fs.readFileSync(filename, 'utf8').split('\n');

    while (lines[0].startsWith('#')) {
        lines.shift();
    }
    return lines.map(line => {
        const [,, date, avg, interpolated, trend] = line.split(/\s+/)
            .map(txt => parseFloat(txt));
        return {date, avg, interpolated, trend};
    });
})();

const MaunaLoaCO2Data = {};
MaunaLoaCO2Data.serviceName = 'MaunaLoaCO2Data';

/**
 * Get the mole fraction of CO2 (in parts per million) by year. Missing measurements
 * are interpolated.
 *
 * If a start and end year is provided, only measurements within the given range will be
 * returned.
 *
 * @param {Number=} startyear Year to begin data at
 * @param {Number=} endyear Year to begin data at
 * @returns {Array}
 */
MaunaLoaCO2Data.getRawCO2 = function(startyear=-Infinity, endyear=Infinity){
    return data.filter(datum => datum.date > startyear && datum.date < endyear)
        .map(datum => [datum.date, datum.interpolated]);
};

/**
 * Get the mole fraction of CO2 (in parts per million) by year with the seasonal
 * cycle removed.
 *
 * If a start and end year is provided, only measurements within the given range will be
 * returned.
 *
 * @param {Number=} startyear Year to begin data at
 * @param {Number=} endyear Year to begin data at
 * @returns {Array}
 */
MaunaLoaCO2Data.getCO2Trend = function(startyear=-Infinity, endyear=Infinity){
    return data.filter(datum => datum.date > startyear && datum.date < endyear)
        .map(datum => [datum.date, datum.trend]);
};

module.exports = MaunaLoaCO2Data;
