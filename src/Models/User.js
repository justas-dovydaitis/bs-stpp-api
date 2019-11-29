/* global process */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

// schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: 'String',
        required: true,
        trim: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    },
    role: {
        type: 'String',
        required: true,
        trim: true,
        default: 'STANDARD',
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        bcrypt.hash(user.password, stage.saltingRounds, function (err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.email);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('user', userSchema);