/* global process */
require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express');
const bodyParser = require('body-parser');
// const logger = require('morgan');

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'uploads',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
});
const parser = multer({ storage: storage });


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
app.use(parser.any());

// if (environment !== 'production') {
//     app.use(logger('dev'));
// }
app.use('/uploads', express.static('uploads'));
app.use('/api/', routes(router));

app.listen(`80`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;