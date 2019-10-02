/* global process */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Speaker = require('../Models/Speaker');

const connUri = process.env.MONGODB_URL;

module.exports = {
    create: (req, res) => {
        res.status(501).send({ error: 'not implemented yet' });
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