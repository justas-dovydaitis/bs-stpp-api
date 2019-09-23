const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const speakerSchema = new Schema({
    name: {
        type: 'Date',
        required: true,
        min: new Date()
    },
    job: {
        type: 'Date',
        required: true,
        min: new Date()
    },
    description: {
        type: 'String',
        required: true,
        trim: true
    },
    photo: {
        type: 'String',
        required: false,
        trim: true
    }
});

module.exports = mongoose.model('speaker', speakerSchema);