const users = require('./User');
const lectures = require('./Lecture');
const speakers = require('./Speaker');
const places = require('./Place');
const auth = require('./Auth');

module.exports = (router) => {
    users(router);
    lectures(router);
    speakers(router);
    places(router);
    auth(router);
    return router;
};