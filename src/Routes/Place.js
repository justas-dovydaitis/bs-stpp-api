const controller = require('../Controllers/Lecture');
// const utils = require('../Utils/Auth');

module.exports = (router) => {
    router.route('/places')
        .post(/*utils.validateToken, utils.checkIfAdmin,*/ controller.create)
        .get(/*utils.validateToken,*/ controller.getAll);
    router.route('/places/:id')
        .get(/*utils.validateToken,*/ controller.getOne)
        .put(/*utils.validateToken, utils.checkIfAdmin,*/ controller.update)
        .delete(/*utils.validateToken, utils.checkIfAdmin,*/ controller.delete);
};