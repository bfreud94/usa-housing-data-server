// Imports for external dependencies
const express = require('express');
const csv = require('async-csv');
const fs = require('fs').promises;
const zipcodes = require('zipcodes');
const path = require('path');
const router = express.Router();

router.get('/data', async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, `../resources/${process.env.test_file}`);
        const csvString = await fs.readFile(filePath, 'utf-8');
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
    } catch (error) {
        next(error);
    }
});

module.exports = router;