const users = require('./User');
const lectures = require('./Lecture');
const speakers = require('./Speaker');

module.exports = (router) => {
    users(router);
    lectures(router);
    speakers(router);
    return router;
};