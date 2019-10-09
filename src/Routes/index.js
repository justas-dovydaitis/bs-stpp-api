const users = require('./User');
const lectures = require('./Lecture');
const speakers = require('./Speaker');
const places = require('./Place');

module.exports = (router) => {
    users(router);
    lectures(router);
    speakers(router);
    places(router);
    return router;
};