const controller = require('../Controllers/Auth');
const utils = require('../Utils/Auth');


module.exports = (router) => {
    router.route('/login').post(controller.login);
    router.route('/signup').post(controller.signup);
    // router.route('/token').post(utils.validateToken, controller.token);

};