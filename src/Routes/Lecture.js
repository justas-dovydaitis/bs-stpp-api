const controller = require('../Controllers/Lecture');
// const utils = require('../Utils/Auth');

module.exports = (router) => {
    router.route('/lectures')

        // Gets list of all lectures.
        .get(controller.getAll)

        // Creates a new lecture.
        .post(controller.create);

    router.route('/lectures/:id')

        // Gets a lecture by id.
        .get(controller.getOne)

        // Updates lecture by given id.
        .put(controller.update)

        // Deletes lecture by given id.
        .delete(controller.delete);

    router.route('/lectures/:lectureId/speakers')

        // Gets speakers that speaks on given lecture.
        .get(controller.getSpeakers)

        // Creates a speaker and attaches to lecture.
        .post(controller.createSpeaker)

    router.route('/lectures/:lectureId/speakers/:speakerId')

        // Get speaker by id.
        .get(controller.getSpeaker)

        // Attatch speaker to lecture.
        .post(controller.attachSpeaker)

        // Updates speaker.
        .put(controller.updateSpeaker)

        // Detach speaker from lecture.
        .delete(controller.detachSpeaker);
};