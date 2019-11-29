/* global process */
const mongoose = require('mongoose');
const Lecture = require('../Models/Lecture');

const connUri = process.env.MONGODB_URL;

module.exports = {
    create: (req, res) => {
            mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
                let result = {};
                let status = 201;
                if (!err) {
                    const {
                        starts,
                        ends,
                        name,
                        description,
                        speakers
                    } = req.body;
                    const lecture = new Lecture({
                        starts,
                        ends,
                        name,
                        description,
                        speakers
                    });
                    lecture.save((err, lecture) => {
                        if (!err) {
                            result.status = status;
                            result.result = lecture;
                        } else {
                            status = 500;
                            result.status = status;
                            result.error = err;
                        }
                        res.status(status).send(result);
                    });
                } else {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }
            });
        // res.status(501).send({ error: 'not implemented yet' });
    },
    getAll: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        //     let result = {};
        //     let status = 200;
        //     if (!err) {
        //         const payload = req.decoded;
        //         if (payload) {
        //             Lecture.find({}, (err, lectures) => {
        //                 if (!err) {
        //                     result.status = status;
        //                     result.error = err;
        //                     result.result = lectures;
        //                 } else {
        //                     status = 500;
        //                     result.status = status;
        //                     result.error = err;
        //                 }
        //                 res.status(status).send(result);
        //             });
        //         } else {
        //             status = 401;
        //             result.status = status;
        //             result.error = 'Authentication error';
        //             res.status(status).send(result);
        //         }
        //     }
        //     else {
        //         status = 500;
        //         result.status = status;
        //         result.error = err;
        //         res.status(status).send(result);
        //     }
        // });
        res.status(501).send({ error: 'not implemented yet' });
    },
    getOne: (req, res) => {
        // mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        //     let result = {};
        //     let status = 200;
        //     if (!err) {
        //         Lecture.findOne({ _id: req.params.id }, (err, lecture) => {
        //             if (!err && lecture) {
        //                 res.status(status).send(lecture);
        //             }
        //             else {
        //                 status = 404;
        //                 result.status = status;
        //                 result.error = 'user not found';
        //                 res.status(status).send(result);
        //             }
        //         });
        //     }
        // });
        res.status(501).send({ error: 'not implemented yet' });
    },
    update: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    },
    delete: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    }
};