const controller = require('../Controllers/User');
const utils = require('../Utils/Auth');

module.exports = (router) => {
    router.route('/users')
        // // Create user (registration).
        .post(controller.create)
        // // Get list of users.
        .get(controller.getAll);
    router.route('/users/:id')
        // Get user by id.
        .get(controller.getOne)
        // Update user by id.
        .put(controller.update)
        // Delete user by id.
        .delete(controller.delete);
};