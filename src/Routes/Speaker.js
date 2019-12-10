const controller = require('../Controllers/Speaker');
const utils = require('../Utils/Auth');


module.exports = (router) => {
    router.route('/speakers')

        // Gets list of all speakers.
        .get(controller.getAll)

        // Creates a new speaker.
        .post(utils.validateAccessToken, utils.checkIfAdmin, controller.create);

    router.route('/speakers/:id')

        // Gets speaker by id.
        .get(controller.getOne)

        // Updates speaker.
        .put(utils.validateAccessToken, utils.checkIfAdmin, controller.update)

        // Deletes speaker.
        .delete(utils.validateAccessToken, utils.checkIfAdmin, controller.delete);

    router.route('/speakers/:speakerId/lectures')

        // Gets all speaker lectures.
        .get(controller.getLectures)

        // Creates new lecture and attaches it to speaker.
        .post(utils.validateAccessToken, utils.checkIfAdmin, controller.createLecture);

    router.route('/speakers/:speakerId/lectures/:lectureId')

        // Gets lecture by id.
        .get(controller.getLecture)

        // Attaches lecture to speaker.
        .post(utils.validateAccessToken, utils.checkIfAdmin, controller.attachLecture)

        // Updates lecture.
        .put(utils.validateAccessToken, utils.checkIfAdmin, controller.updateLecture)

        // Detaches lecture from speaker.
        .delete(utils.validateAccessToken, utils.checkIfAdmin, controller.detachLecture);
};


