const controller = require('../Controllers/User');
const utils = require('../Utils/Auth');

module.exports = (router) => {
    router.route('/users')
        // // Create user (registration).
        // .post(controller.create)
        // // Get list of users.
        // .get(utils.validateToken, utils.checkIfAdmin, controller.getAll);
    router.route('/users/:id')
        // // Get user by id.
        // .get(utils.validateToken, utils.checkUser, controller.getOne)
        // // Update user by id.
        // .put(utils.validateToken, utils.checkUser, controller.update)
        // // Delete user by id.
        // .delete(utils.validateToken, utils.checkIfAdmin, controller.delete);
};