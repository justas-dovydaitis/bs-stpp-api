const controller = require('../Controllers/User');
const utils = require('../Utils/Auth');

module.exports = (router) => {
    router.route('/users')
        // // Create user (registration).
        .post(controller.create)
        // // Get list of users.
        .get(utils.validateAccessToken, utils.checkIfAdmin, controller.getAll);
    router.route('/users/:id')
        // Get user by id.
        .get(utils.validateAccessToken, utils.checkUser, controller.getOne)
        // Update user by id.
        .put(utils.validateAccessToken, utils.checkUser, controller.update)
        // Delete user by id.
        .delete(utils.validateAccessToken, utils.checkUser, controller.delete);
};