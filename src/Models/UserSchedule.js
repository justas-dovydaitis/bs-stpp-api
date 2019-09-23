const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const userScheduleSchema = new Schema({
    user: {
        type: 'Number',
        required: true
    },
    lectures: {
        type: ['Number'],
        required: false,
        default: undefined,
    }
});

module.exports = mongoose.model('speaker', userScheduleSchema);