/* eslint-disable require-atomic-updates */
/* global process */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../Models/User');
const connUri = process.env.MONGODB_URL;

const generateAccessToken = (user) => {
    return accessToken = jwt.sign(
        {
            user: user.email,
            role: user.role
        },
        process.env.ACCESS_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
            issuer: process.env.TOKEN_ISSUER
        }
    );
}

const generateRefreshToken = (user) => {
    return refreshToken = jwt.sign(
        {
            user: user.email,
            role: user.role
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_LIFE,
            issuer: process.env.TOKEN_ISSUER
        }
    );
}

const validateRefreshToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (token) {

        jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json(
                    {
                        "error": true,
                        "message": 'Unauthorised access.'
                    });
            }
            req.decoded = jwt.decode(token, {complete: true}).payload;
            next();
        });
    }
    else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}
const validateAccessToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['Authorization'];
    if (token) {

        jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json(
                    {
                        "error": true,
                        "message": 'Unauthorised access.'
                    });
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}

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
            console.log('payload:', payload);
            User.findOne({ email: payload.user }, (err, requestingUser) => {
                console.log(requestingUser);
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
module.exports = {
    checkIfAdmin,
    checkUser,
    generateAccessToken,
    generateRefreshToken,
    validateAccessToken,
    validateRefreshToken
};