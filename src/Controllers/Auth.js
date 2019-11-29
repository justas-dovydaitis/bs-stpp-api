const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const { generateAccessToken, generateRefreshToken } = require('../Utils/Auth');

const connUri = process.env.MONGODB_URL;

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        let result = {};
        let status = 200;
        User.findOne({ email }, (err, user) => {
            if (!err && user) {
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        status = 200;
                        result.accessToken = generateAccessToken(user);
                        result.refreshToken = generateRefreshToken({ ...user, password: password });
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication error.';
                    }
                    res.status(status).send(result);
                }).catch(err => {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
            } else {
                status = 404;
                result.status = status;
                result.error = "User does not exist.";
                res.status(status).send(result);
            }
        });
    },
    signup: (req, res) => {
        let result = {};
        let status = 201;
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        user.save((err, user) => {
            if (!err) {
                result.status = status;
                result.result = user;
                result.accessToken = generateAccessToken(user);
                result.refreshToken = generateRefreshToken({ ...user, password: password });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status).send(result);
        });
    },
    token: (req, res) => {
        let status = 200;
        let result = {};
        result.accessToken = generateAccessToken({ user: decoded.email, role: decoded.role });
        result.status = status;
        res.status(status).send(result);
    }
}