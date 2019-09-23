const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const lectureShema = new Schema({
    starts: {
        type: 'Date',
        required: true,
        min: new Date()
    },
    ends: {
        type: 'Date',
        required: true,
        min: new Date()
    },
    name: {
        type: 'String',
        required: true,
        trim: true
    },
    description: {
        type: 'String',
        required: true,
        trim: true,
    },
    speakers: {
        type: ['Number'],
        default: undefined
    }
});

module.exports = mongoose.model('lecture', lectureShema);