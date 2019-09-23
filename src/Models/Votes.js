const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const votesSchema = new Schema({
    lecture: {           //Lecture id
        type: 'Number',
        required: true
    },
    user: {              //User id
        type: 'Number',
        required: true
    },
    /*  0   = :(
    *   0.5 = :|
    *   1   = :)
    */  
    vote: {              
        type: 'Number',
        required: true
    },
});

module.exports = mongoose.model('vote', votesSchema);