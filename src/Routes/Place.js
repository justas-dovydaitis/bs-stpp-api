const Place = require('../Models/Place');
const Lecture = require('../Models/Lecture');
const Speaker = require('../Models/Speaker');
const generic = require('../Controllers/Generic');


module.exports = (router) => {
    router.route('/places/')
        .get(
            (req, res, next) => generic.find(req, res, next, { model: Place, paramName: '', findOne: false }),
            generic.respond
        )
        .post(
            (req, res) => { generic.create(Place, req, res) }
        );
    router.route('/places/:placeId/')
        .get(
            (req, res, next) => generic.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            generic.respond
        );
    router.route('/places/:placeId/lectures/')
        .get(
            (req, res, next) => generic.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            (req, res, next) => generic.find(req, res, next, { model: Lecture, paramName: '', findOne: false, prevName: 'lectures' }),
            generic.respond
        );
    router.route('/places/:placeId/lectures/:lectureId/')
        .get(
            (req, res, next) => generic.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            (req, res, next) => generic.find(req, res, next, { model: Lecture, paramName: 'lectureId', findOne: true, prevName: 'lectures' }),
            generic.respond
        );
    router.route('/places/:placeId/lectures/:lectureId/speakers/')
        .get(
            (req, res, next) => generic.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            (req, res, next) => generic.find(req, res, next, { model: Lecture, paramName: 'lectureId', findOne: true, prevName: 'lectures' }),
            (req, res, next) => generic.find(req, res, next, { model: Speaker, paramName: '', findOne: false, prevName: 'speakers' }),
            generic.respond
        );
    router.route('/places/:placeId/lectures/:lectureId/speakers/:speakerId')
        .get(
            (req, res, next) => generic.find(req, res, next, { model: Place, paramName: 'placeId', findOne: true }),
            (req, res, next) => generic.find(req, res, next, { model: Lecture, paramName: 'lectureId', findOne: true, prevName: 'lectures' }),
            (req, res, next) => generic.find(req, res, next, { model: Speaker, paramName: 'speakerId', findOne: true, prevName: 'speakers' }),
            generic.respond
        );
};