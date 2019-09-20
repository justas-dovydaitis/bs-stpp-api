const users = require('./User');

module.exports = (router) => {
    users(router);
    return router;
};