/* global process */
require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
// eslint-disable-next-line no-unused-vars
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

const routes = require('./Routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api/', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;