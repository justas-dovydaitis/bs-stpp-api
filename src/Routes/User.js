const controller = require('../Controllers/User');
const validateToken = require('../Utils/Auth').validateToken;

module.exports = (router) => {
    router.route('/users')
        .post(controller.create)
        .get(validateToken, controller.getAll);
    router.route('/login').post(controller.login);
};