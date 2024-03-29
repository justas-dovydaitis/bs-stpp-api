const Speaker = require('../Models/Speaker');
const Lecture = require('../Models/Lecture');
const mongoose = require('mongoose');

module.exports = {
    create: (req, res) => {
        console.log(req.body)
        Speaker.create({ ...req.body, lectures: [] })
            .then((speaker) => {
                res.status(201).json(speaker);
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                });
            });
    },
    getAll: (req, res) => {
        Speaker.find({})
            .then((speaker) => {
                res.status(200).json(speaker);
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getOne: (req, res) => {
        Speaker.findById(req.params.id)
            .then((speaker) => {
                if (speaker) {
                    res.status(200).json(speaker);
                }
                else {
                    res.status(404).json({ error: 'Not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    update: (req, res) => {
        Speaker.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
            .then((speaker) => {
                if (speaker) {
                    res.status(200).json({ speaker });
                }
                else {
                    res.status(404).json({ error: 'Not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    delete: (req, res) => {
        Speaker.findByIdAndDelete(req.params.id)
            .then((speaker) => {
                if (speaker) {
                    res.status(204).json({});
                }
                else {
                    res.status(404).json({ error: 'Not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getLectures: (req, res) => {
        Speaker.findById(req.params.speakerId)
            .then((speaker) => {
                if (speaker) {
                    Lecture.find({ speakers: speaker._id })
                        .then((lectures) => {
                            res.status(200).json(lectures);
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });

                }
                else {
                    res.status(404).json({ error: 'Speaker not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    createLecture: (req, res) => {
        Speaker.findById(req.params.speakerId)
            .then((speaker) => {
                if (speaker) {
                    Lecture.create({ ...req.body, speakers: [speaker._id] })
                        .then((lecture) => {
                            speaker.lectures.push(lecture._id);
                            speaker.save().catch(errors => {
                                res.status(500).json({
                                    errors,
                                })
                            });;
                            res.status(201).json(lecture);
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
                }
                else {
                    res.status(404).json({ Error: "Speaker not found" });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getLecture: (req, res) => {
        Speaker.findById(req.params.speakerId)
            .then((speaker) => {
                if (speaker) {
                    Lecture.findOne({ speakers: speaker._id, _id: req.params.lectureId })
                        .then((lecture) => {
                            if (lecture) {
                                res.status(200).json(lecture);
                            }
                            else {
                                res.status(404).json({ error: 'Lecture not found' });
                            }
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
                }
                else {
                    res.status(404).json({ error: 'Speaker not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    attachLecture: (req, res) => {
        Speaker.findOneAndUpdate({
            _id: req.params.speakerId,
            'speakers.lectures': {
                $ne: req.params.lectureId
            }
        }, { $push: { lectures: req.params.lectureId } })
            .then((speaker) => {
                if (speaker) {
                    Lecture.findOneAndUpdate({
                        _id: req.params.lectureId,
                        'lectures.speakers': { $ne: req.params.speakerId }
                    }, { speakers: req.params.speakerId })
                        .then((lecture) => {
                            if (lecture) {
                                res.status(200).json({ lecture });
                            }
                            else {
                                res.status(404).json({ error: 'Lecture not found' });
                            }
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
                }
                else {
                    res.status(404).json({ error: 'Speaker not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    updateLecture: (req, res) => {
        let query = { _id: req.params.lectureId, speakers: req.params.speakerId };
        Lecture.findOneAndUpdate(query, { ...req.body }, { new: true })
            .then((lecture) => {
                if (lecture) {
                    res.status(200).json(lecture);
                }
                else {
                    res.status(404).json({ error: "Not found" });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    detachLecture: (req, res) => {
        Speaker.findOneAndUpdate({ _id: req.params.speakerId }, { $pull: { ectures: req.params.lectureId } })
            .then((speaker) => {
                if (speaker) {
                    Lecture.findOneAndUpdate({ _id: req.params.lectureId }, { $pull: { speakers: req.params.speakerId } })
                        .then((lecture) => {
                            if (lecture) {
                                res.status(200).json({ speaker });
                            }
                            else {
                                res.status(404).json({ error: "Lecture not found" });
                            }
                        })
                        .catch(errors => {
                            res.status(500).json({
                                errors,
                            })
                        })
                }
                else {
                    res.status(404).json({ error: "Speaker not found" });
                }
            })
            .catch(errors => {
                res.status(500).json({
                    errors,
                })
            });
    }

}