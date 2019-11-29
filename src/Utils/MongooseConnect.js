const mongoose = require('mongoose');

let connUri = process.env.MONGODB_URL;

module.exports = () => {
    mongoose.connect(connUri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    mongoose.connection.on('connected', () => {
        console.log("Mongoose default connection is open to", connUri)
    })
    mongoose.connection.on('error', (err) => {
        console.log("Mongoose default connection has occured " + err + " error");
    });
    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose default connection is disconnected");
    });
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}