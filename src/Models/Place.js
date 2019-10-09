const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    name: {
        type: 'String',
        required: true,
    }
});

module.exports = mongoose.model('speaker', placesSchema);