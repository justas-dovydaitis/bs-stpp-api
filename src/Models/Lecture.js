const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lectureShema = new Schema({
    starts: {
        type: 'Date',
        required: true,
    },
    ends: {
        type: 'Date',
        required: true,
    },
    name: {
        type: 'String',
        required: true,
        trim: true
    },
    description: {
        type: 'String',
        required: true,
    },
    shortDescription: {
        type: 'String',
        required: true,
        trim: true,
    },
    speakers: {
        type: ['ObjectId'],
        default: undefined
    },
    place: {
        type: 'ObjectId'
    }
});

module.exports = mongoose.model('lecture', lectureShema);