const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const speakerSchema = new Schema({
    name: {
        type: 'String',
        required: true,
    },
    image: {
        data: 'Buffer',
        contentType: 'String'
    },
    job: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('speaker', speakerSchema);