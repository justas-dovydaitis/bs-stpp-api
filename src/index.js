/* global process */
require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const mongooseConn = require('./Utils/MongooseConnect');

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

const allowedOrigins = [
  'http://localhost:3000',
  'https://buildstuff.orangecactus.lt'
];
mongooseConn();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(parser.any());

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.enable('trust proxy'); // optional, not needed for secure cookies
// app.use(express.session({
//     secret : 'buildstuffSecretVeryMuchSecret',
//     key : 'sid',
//     proxy : true, // add this when behind a reverse proxy, if you need secure cookies
//     cookie : {
//         secure : true,
//         maxAge: 5184000000 // 2 months
//     }
// }));

if (environment !== 'production') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

app.use('/api/', routes(router));

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
