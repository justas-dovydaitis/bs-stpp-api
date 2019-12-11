
const Place = require('../Models/Place');
const Lecture = require('../Models/Lecture');

module.exports = {
    create: (req, res) => {
        Place.create({ ...req.body, lectures: [] })
            .then((newPlace) => {
                res.status(201).json(newPlace);
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                });
            });
    },
    getAll: (req, res) => {
        Place.find({})
            .then((places) => {
                res.status(200).json(places);
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getOne: (req, res) => {
        Place.findById(req.params.id)
            .then((place) => {
                if (place) {
                    res.status(200).json(place);
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
        Place.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
            .then((place) => {
                if (place) {
                    res.status(200).json({ place });
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
        Place.findByIdAndDelete(req.params.id)
            .then((place) => {
                if (place) {
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
        Place.findById(req.params.id)
            .then((place) => {
                if (place) {
                    Lecture.find({ place: place._id })
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
                    res.status(404).json({ error: 'Place not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    createLecture: (req, res) => {
        Place.findById(req.params.id)
            .then((place) => {
                if (place) {
                    Lecture.create({ ...req.body, place: place._id })
                        .then((lecture) => {
                            place.lectures.push(lecture._id);
                            place.save().catch(errors => {
                                res.status(500).json({
                                    errors,
                                })
                            });
                            res.status(201).json(lecture);
                        })
                        .catch((errors) => {
                            res.status(500).json({
                                errors,
                            })
                        });
                }
                else {
                    res.status(404).json({ Error: "{Place not found}" });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    getLecture: (req, res) => {
        Place.findById(req.params.placeId)
            .then((place) => {
                if (place) {
                    Lecture.findOne({ place: place._id, _id: req.params.lectureId })
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
                    res.status(404).json({ error: 'Place not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    attachLecture: (req, res) => {
        Place.findById(req.params.placeId)
            .then((place) => {
                if (place) {
                    Lecture.findById(req.params.lectureId)
                        .then((lecture) => {
                            if (lecture) {
                                if (place.lectures.includes(lecture._id) && lecture.place === place._id)
                                    res.status(304).json();
                                else {
                                    lecture.place = place._id;
                                    place.lectures.push(lecture._id);

                                    lecture.save()
                                        .then(() => {
                                            place.save().catch(errors => {
                                                res.status(500).json({
                                                    errors,
                                                })
                                            });
                                        })
                                        .catch(errors => {
                                            res.status(500).json({
                                                errors,
                                            })
                                        });

                                    res.status(200).json({});
                                }
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
                    res.status(404).json({ error: 'Place not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    updateLecture: (req, res) => {
        let query = { _id: req.params.lectureId, place: req.params.placeId };
        Lecture.findOneAndUpdate(query, { ...req.body }, { new: true })
            .then((lecture) => {
                if (lecture) {
                    res.status(200).json(lecture);
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },
    detachLecture: (req, res) => {
        Place.findById(req.params.placeId)
            .then((place) => {
                if (place) {
                    Lecture.findById(req.params.lectureId)
                        .then((lecture) => {
                            if (lecture) {
                                if (!place.lectures.includes(lecture._id) && lecture.place !== place._id)
                                    res.status(304).json();
                                else {
                                    lecture.place = undefined;
                                    place.lectures.remove(req.params.lectureId);

                                    lecture.save()
                                        .then(() => {
                                            place.save()
                                                .then(() => {
                                                    res.status(200).json({ message: 'OK' });
                                                })
                                                .catch(errors => {
                                                    res.status(500).json({
                                                        errors,
                                                    })
                                                });
                                        })
                                        .catch(errors => {
                                            res.status(500).json({
                                                errors,
                                            })
                                        });



                                }
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
                    res.status(404).json({ error: 'Place not found' });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors,
                })
            });
    },

};