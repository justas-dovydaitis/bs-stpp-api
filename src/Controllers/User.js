/* global process */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const genericRequests = require('./Generic');

const connUri = process.env.MONGODB_URL;

module.exports = {
    create: (req, res) => {
        let result = {};
        let status = 201;
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        user.save((err, user) => {
            if (!err) {
                result.status = status;
                result.result = user;
            } else {
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status).send(result);
        });
    },
    getAll: (req, res) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            User.find({}, (err, users) => {
                if (!err) {
                    result.status = status;
                    result.error = err;
                    result.result = users;
                } else {
                    status = 500;
                    result.status = status;
                    result.error = err;
                }
                res.status(status).send(result);
            });
        } else {
            status = 401;
            result.status = status;
            result.error = 'Authentication error';
            res.status(status).send(result);
        }
    },
    getOne: (req, res) => {
        genericRequests.getOne(User, req, res);
    },
    update: (req, res) => {
        genericRequests.updateById(User, req, res);
    },
    delete: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
    }
};