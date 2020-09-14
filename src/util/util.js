const csv = require('async-csv');
const zipcodes = require('zipcodes');

const analyzeCSV = async (res, csvString) => {
    const rows = await csv.parse(csvString);
    const data = [];
    rows.forEach((row, index) => {
        if(index !== 0) {
            const { latitude, longitude } = zipcodes.lookup(row[2]);
            const medianPrice = row[row.length - 1].toString();
            data.push([latitude, longitude, medianPrice]);
        }
    });
    res.send(data);
}

module.exports = {
    analyzeCSV
}