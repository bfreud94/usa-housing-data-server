// Imports for external dependencies
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// Imports for internal dependencies
const middlewares = require('./middlewares');

// Dotenv config
require('dotenv').config();

// Routes
const housingData = require('./api/housingData');

// Initialize express
const app = express();

// Preventing 304 Status Codes
app.disable('etag');

// Port number
const port = process.env.PORT || 8000;

// Use express body parser
app.use(express.json());

// Use Morgan
app.use(morgan('common'));

// Use Helmet
app.use(helmet());

// Use CORS (fix when deploying to production)
app.use(cors({
    origin: process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:3000' : 'https://usa-housing-data-client.vercel.app'
}));

// Use Express Routes
app.use('/api/housingData', housingData);

app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
});

// Use custom middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Starting server
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started port on ${port}`);
});