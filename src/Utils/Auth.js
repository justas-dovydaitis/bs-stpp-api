/* eslint-disable require-atomic-updates */
/* global process */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../Models/User');
const connUri = process.env.MONGODB_URL;


const validateToken = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    let result;
    if (authorizationHeader) {
        if (authorizationHeader.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: '2d',
                issuer: 'https://buildstuff.lt'
            };
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                // Let's pass back the decoded token to the request object
                req.decoded = result;
                // We call next to pass execution to the subsequent middleware
                next();
            } catch (err) {
                // Throw an error just in case anything goes wrong with verification
                throw new Error(err);
            }
        }
        else {
            result = {
                error: 'Bearer token type expected',
                status: 401
            };
            res.status(401).send(result);
        }
    } else {
        result = {
            error: 'Authorization header must be provided',
            status: 401
        };
        res.status(401).send(result);
    }
};

const checkIfAdmin = async (req, res, next) => {
    let result = {};
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        if (!err) {
            const payload = req.decoded;
            User.findOne({ email: payload.user }, (err, requestingUser) => {
                if (requestingUser.isAdmin === false) {
                    result.status = 403;
                    result.error = 'Access forbidden.';
                    result.result = {};
                    res.status(403).send(result);
                }
                else
                    next();
            });
        }
        else {
            let status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
};
const checkUser = async (req, res, next) => {
    let result = {};
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        if (!err) {
            const payload = req.decoded;
            User.findOne({ email: payload.user }, (err, requestingUser) => {
                if (requestingUser._id.toString() === req.params.id) {
                    next();

                }
                else {
                    result.status = 403;
                    result.error = 'Access forbidden.';
                    result.result = {};
                    res.status(403).send(result);
                }
            });
        }
        else {
            let status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
};
module.exports = { validateToken, checkIfAdmin, checkUser };