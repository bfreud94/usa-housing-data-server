// Imports for external dependencies
const express = require('express');
const csv = require('async-csv');
const zipcodes = require('zipcodes');
const router = express.Router();
const { options } = require('../util/dropdownOptions');
const { Storage } = require('@google-cloud/storage');

router.get('/data', async (req, res, next) => {
    try {
        const gc = new Storage({
            credentials: {
                client_email: process.env.client_email,
                private_key: process.env.private_key.replace(/\\n/g, '\n')
            },
            projectId: process.env.projectId
        });
        let contents = await new Promise((resolve, reject) => {
            let contents = '';
            gc.bucket('csv-data').file(`${options(req.query['mapType'])}`).createReadStream().on('data', (d) => contents += d).on('end', () => resolve(contents));
        });
        const rows = await csv.parse(contents);
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