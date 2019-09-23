/* global process */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const connUri = process.env.MONGODB_URL;

module.exports = {
    create: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
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
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    login: (req, res) => {
        const { email, password } = req.body;
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                User.findOne({ email }, (err, user) => {
                    if (!err && user) {
                        // We could compare passwords in our model instead of below as well
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
                                status = 200;
                                // Create a token
                                const payload = { user: user.email, isAdmin: user.isAdmin };
                                const options = { expiresIn: '2d', issuer: 'https://buildstuff.lt' };
                                const secret = process.env.JWT_SECRET;
                                const token = jwt.sign(payload, secret, options);
                                result.token = token;
                                result.status = status;
                                result.result = user;
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = 'Authentication error';
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
                        result.error = err;
                        res.status(status).send(result);
                    }
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    getAll: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                const payload = req.decoded;
                User.findOne({ email: payload.user }, (err, requestingUser) => {
                    if (requestingUser.isAdmin === false) {
                        result.status = 403;
                        result.error = 'Access forbidden. You must be admin to see all users';
                        result.result = {};
                        res.status(403).send(result);
                    }
                    else {
                        if (payload ) {
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
                    }

                });
            }
            else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
};