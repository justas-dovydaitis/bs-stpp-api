const controller = require('../Controllers/Speaker');
// const utils = require('../Utils/Auth');


module.exports = (router) => {
    router.route('/speakers')

        // Gets list of all speakers.
        .get(controller.getAll)

        // Creates a new speaker.
        .post(controller.create);

    router.route('/speakers/:id')

        // Gets speaker by id.
        .get(controller.getOne)

        // Updates speaker.
        .put(controller.update)

        // Deletes speaker.
        .delete(controller.delete);

    router.route('/speakers/:speakerId/lectures')

        // Gets all speaker lectures.
        .get(controller.getLectures)

        // Creates new lecture and attaches it to speaker.
        .post(controller.createLecture);

    router.route('/speakers/:speakerId/lectures/:lectureId')

        // Gets lecture by id.
        .get(controller.getLecture)

        // Attaches lecture to speaker.
        .post(controller.attachLecture)

        // Updates lecture.
        .put(controller.updateLecture)

        // Detaches lecture from speaker.
        .delete(controller.detachLecture);
};


