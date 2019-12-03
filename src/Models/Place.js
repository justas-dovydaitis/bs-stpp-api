const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const placesSchema = new Schema({
    name: {
        type: 'String',
        required: true,
    },
    lectures: {
        type: ['ObjectId'],
        required: false
    }
});

module.exports = mongoose.model('place', placesSchema);