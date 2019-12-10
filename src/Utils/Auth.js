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
            expiresIn: `${process.env.ACCESS_TOKEN_LIFE}min`,
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
            expiresIn: `${process.env.REFRESH_TOKEN_LIFE}min`,
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
                        error: 'Unauthorised access.'
                    });
            }
            req.decoded = jwt.decode(token, { complete: true }).payload;
            next();
        });
    }
    else {
        return res.status(401).json({
            error: 'No token provided.'
        });
    }
}
const validateAccessToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (token) {

        jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json(
                    {
                        error: 'Unauthorised access.'
                    });
            }
            req.decoded = decoded;
            next();
        });
    }
    else {
        return res.status(401).json({
            error: 'No token provided.'
        });
    }
}

const checkIfAdmin = async (req, res, next) => {
    const payload = req.decoded;
    User.findOne({ email: payload.user })
        .then((requestingUser) => {
            if (requestingUser) {
                if (requestingUser.role != "ADMIN") {
                    res.status(403).json({ error: "Access forbidden" });
                }
                else next();
            }
            else {
                res.status(404).json({ error: 'User data not found' });
            }
        })
        .catch(errors => {
            res.status(500).json(errors);
        })

};
const checkUser = async (req, res, next) => {
    const payload = req.decoded;
    User.findOne({ email: payload.user })
        .then((requestingUser) => {
            if (requestingUser) {
                if ((requestingUser._id.toString() === req.params.id) || (requestingUser.role === "ADMIN")) {
                    next();
                }
                else {
                    res.status(403).json({ error: "Access forbidden" });
                }
            }
            else {
                res.status(404).json({ error: 'User data not found' });
            }
        })
        .catch((errors) => {
            res.status(500).json({ errors });
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