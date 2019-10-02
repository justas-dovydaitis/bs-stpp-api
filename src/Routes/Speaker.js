const controller = require('../Controllers/Speaker');
const utils = require('../Utils/Auth');

module.exports = (router) => {
    router.route('/speakers')
        .post(utils.validateToken, utils.checkIfAdmin, controller.create)
        .get(utils.validateToken, controller.getAll);
    router.route('/speakers/:id')
        .get(utils.validateToken, controller.getOne)
        .put(utils.validateToken, utils.checkIfAdmin, controller.update)
        .delete(utils.validateToken, utils.checkIfAdmin, controller.delete);
};