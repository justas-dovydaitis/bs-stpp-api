const Lecture = require('../Models/Lecture');
const Speaker = require('../Models/Speaker');
const Place = require('../Models/Place');

module.exports = {
    create: (req, res) => {
        Lecture.create({ ...req.body, speakers: [] })
            .then((lecture) => {
                res.status(201).json(lecture);
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getAll: (req, res) => {
        Lecture.find({})
            .then((lectures) => {
                res.status(200).json(lectures);
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getOne: (req, res) => {
        Lecture.findById(req.params.id)
            .then((lecture) => {
                if (lecture)
                    res.status(200).json(lecture);
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
        Lecture.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            .then((lecture) => {
                if (lecture)
                    res.status(200).json(lecture);
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
        Lecture.findByIdAndDelete(req.params.id)
            .then((lecture) => {
                if (lecture)
                    res.status(204).json();
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
    getSpeakers: (req, res) => {
        Speaker.find({ lectures: req.params.lectureId })
            .then((speakers) => {
                if (speakers)
                    res.status(200).json(speakers);

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
    createSpeaker: (req, res) => {
        Lecture.findById(req.params.lectureId)
            .then((lecture) => {
                if (lecture) {
                    Speaker.create({ ...req.body, lectures: [req.params.lectureId] })
                        .then((speaker) => {
                            lecture.speakers.push(speaker._id);
                            lecture.save().catch(errors => {
                                res.status(500).json({
                                    errors,
                                })
                            });
                            res.status(201).json(speaker);
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
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
    },
    getSpeaker: (req, res) => {
        Speaker.findOne({ lectures: req.params.lectureId, _id: req.params.speakerId })
            .then((speaker) => {
                if (speaker) {
                    res.status(200).json(speaker);
                } else {
                    res.status(404).json({ error: 'Not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getPlace: (req, res) => {
        Place.findOne({ lectures: req.params.lectureId })
            .then((place) => {
                if (place) {
                    res.status(200).json(place);
                } else {
                    res.status(404).json({ error: 'Not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    setPlace: (req, res) => {
        Lecture.findByIdAndUpdate(req.params.lectureId, { place: req.params.placeId })
            .then((lecture) => {
                if (lecture) {
                    Place.findOneAndUpdate(
                        {
                            _id: req.params.placeId,
                            'places.lectures': {
                                $ne: req.params.lectureId
                            }
                        }, { $push: { lectures: req.params.lectureId } })
                        .then((place) => {
                            if (place) {
                                res.status(200).json({ lecture: lecture, place: place });
                            }
                            else {
                                res.status(404).json({ error: "Place not found" })
                            }
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
                }
                else {
                    res.status(404).json({ error: "Place not found" })
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });

    },
    attachSpeaker: (req, res) => {
        Lecture.findById(req.params.lectureId)
            .then((lecture) => {
                if (lecture) {
                    Speaker.findById(req.params.speakerId)
                        .then((speaker) => {
                            if (speaker.lectures.includes(lecture._id) && lecture.speakers.includes(speakerId)) {
                                res.status(304).json();
                            }
                            else {
                                if (!speaker.lectures.includes(lecture._id)) {
                                    speaker.lectures.push(lecture._id);
                                    speaker.save().catch(errors => {
                                        res.status(500).json({
                                            errors,
                                        })
                                    });
                                }
                                if (!lecture.speakers.includes(speakerId)) {
                                    lecture.speakers.push(speaker._id);
                                    lecture.save().catch(errors => {
                                        res.status(500).json({
                                            errors,
                                        })
                                    });
                                }
                                res.status(200).json();
                            }
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
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
    },
    updateSpeaker: (req, res) => {
        let query = {
            _id: req.params.speakerId,
            lectures: req.params.lectureId
        }
        Speaker.findOneAndUpdate(query, { ...req.body }, { new: true })
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
    detachSpeaker: (req, res) => {
        Lecture.findById(req.params.lectureId)
            .then((lecture) => {
                if (lecture) {
                    Speaker.findById(req.params.speakerId)
                        .then((speaker) => {
                            if (!speaker.lectures.includes(lecture._id) && !lecture.speakers.includes(speakerId)) {
                                res.status(304).json();
                            }
                            else {
                                if (speaker.lectures.includes(lecture._id)) {
                                    speaker.lectures.remove(lecture._id);
                                    speaker.save().catch(errors => {
                                        res.status(500).json({
                                            errors,
                                        })
                                    });
                                }
                                if (lecture.speakers.includes(speakerId)) {
                                    lecture.speakers.remove(speaker._id);
                                    lecture.save().catch(errors => {
                                        res.status(500).json({
                                            errors,
                                        })
                                    });
                                }
                                res.status(200).json();
                            }
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
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
};