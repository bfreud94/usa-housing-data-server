// Imports for external dependencies
const express = require('express');
const csv = require('async-csv');
const fs = require('fs').promises;
const zipcodes = require('zipcodes');
const router = express.Router();
const path = require('path');
const { options } = require('../util/dropdownOptions');

router.get('/data', async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, `../resources/Homes/${options(req.query['mapType'])}`);
        const csvString = await fs.readFile(filePath, 'utf-8');
        const rows = await csv.parse(csvString);
        const data = [];
        rows.forEach((row, index) => {
            if(index !== 0) {
                const { latitude, longitude } = zipcodes.lookup(row[2]);
                const medianPrice = row[row.length - 1].toString();
                data.push([latitude, longitude, parseInt(medianPrice), row[2], row[6]]);
            }
        });
        res.send(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;