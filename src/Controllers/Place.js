/* eslint-disable no-unused-vars */
/* global process */
const mongoose = require('mongoose');
const Place = require('../Models/Place');

const connUri = process.env.MONGODB_URL;

module.exports = {
    create: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        //     var newSpeaker = new Speaker();
        //     console.log(req);
        //     newSpeaker.image.data = fs.readFileSync(req.files.image.path);
        //     newSpeaker.image.contentType = 'image/png';
        //     newSpeaker.name = req.body.name;
        //     newSpeaker.job = req.body.job;
        //     newSpeaker.description = req.body.description;
        //     newSpeaker.save();

        res.status(501).send({ error: 'not implemented yet' });
        // });
    },
    getAll: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    },
    getOne: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    },
    update: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    },
    delete: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    }
};