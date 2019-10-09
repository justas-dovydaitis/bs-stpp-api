
/* global process */
const mongoose = require('mongoose');
const connUri = process.env.MONGODB_URL;

const create = (Model, req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        let result = {};
        let status = 201;
        if (!err) {
            const user = new Model({ ...req.body });
            user.save((err, user) => {
                if (!err) {
                    result.status = status;
                    result.result = user;
                } else {
                    status = 500;
                    result.status = status;
                    result.error = err;
                }
                res.status(status).send(result);
            });
        } else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
};
const getOne = (Model, req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        let result = {};
        let status = 200;
        if (!err) {
            const payload = req.decoded;
            if (payload) {
                Model.findOne({ _id: req.params.id }, (err, instance) => {
                    if (!err && instance) {
                        res.status(status).send(instance);
                    }
                    else {
                        status = 404;
                        result.status = status;
                        result.error = 'user not found';
                        res.status(status).send(result);
                    }
                });
            }
            else {
                status = 401;
                result.status = status;
                result.error = 'Authentication error';
                res.status(status).send(result);
            }
        }
        else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);

        }
    });
};
const getAll = (Model, req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        let result = {};
        let status = 200;
        if (!err) {
            const payload = req.decoded;
            if (payload) {
                Model.find({}, (err, users) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = users;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 401;
                result.status = status;
                result.error = 'Authentication error';
                res.status(status).send(result);
            }
        }
        else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
};
const updateById = (Model, req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        let result = {};
        let status = 200;
        if (!err) {
            Model.findOne({ _id: req.params.id }, (err, instance) => {
                if (!err && instance) {
                    instance = { ...req.body };
                    instance.save((err, instance) => {
                        if (!err) {
                            result.status = status;
                            result.result = instance;
                        } else {
                            status = 500;
                            result.status = status;
                            result.error = err;
                        }
                        res.status(status).send(result);
                    });
                }
                else {
                    status = 404;
                    result.status = status;
                    result.error = 'user not found';
                    res.status(status).send(result);
                }
            });
        }
    });
};
const deleteById = (Model, req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
        let result = {};
        let status = 200;
        if (!err) {
            const payload = req.decoded;
            if (payload) {
                Model.deleteOne({ _id: req.params.id }, (err) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = 'Deleted!';
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 401;
                result.status = status;
                result.error = 'Authentication error';
                res.status(status).send(result);
            }
        }
        else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
};
module.exports = {
    create,
    getOne,
    getAll,
    updateById,
    deleteById,
};