
/* global process */
const mongoose = require('mongoose');
const connUri = process.env.MONGODB_URL;


/**
 * 
 * @param {*} req request parameter
 * @param {*} res result parameter
 * @param {*} next next method in chain
 * @param {*} options options
 */
const find = (req, res, next, options = { model: undefined, prevName: '', paramName: '', findOne: false }) => {
    let result = {};
    let status = 200;
    let query = {};

    // By default we use Model.find() method;
    let method = options.model.find.bind(options.model);
    if (options.findOne) {
        // Override to use Model.FindOne();
        method = options.model.findOne.bind(options.model);
        if (options.paramName) {
            query['_id'] = req.params[options.paramName];
        }
    }
    else if (options.prevName && !options.paramName) {
        let ids = req.prev[options.prevName].map(id => { return new mongoose.Types.ObjectId(id) });
        query['_id'] = Array.isArray(req.prev[options.prevName]) ? { $in: ids } : req.prev[options.prevName];
    }

    method(query, (err, instance) => {
        if (!err && instance) {
            req.prev = instance;
            next();
        }
        else {
            status = 404;
            result.status = status;
            result.error = `Instance '${options.paramName}' not found`;
            res.status(status).send(result);
        }
    });
};


const respond = (req, res) => {
    res.status(200).send(req.prev);
};

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

const update = (Model, req, res) => {
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
// const deleteById = (Model, req, res) => {
//     mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
//         let result = {};
//         let status = 200;
//         if (!err) {
//             const payload = req.decoded;
//             if (payload) {
//                 Model.deleteOne({ _id: req.params.id }, (err) => {
//                     if (!err) {
//                         result.status = status;
//                         result.error = err;
//                         result.result = 'Deleted!';
//                     } else {
//                         status = 500;
//                         result.status = status;
//                         result.error = err;
//                     }
//                     res.status(status).send(result);
//                 });
//             } else {
//                 status = 401;
//                 result.status = status;
//                 result.error = 'Authentication error';
//                 res.status(status).send(result);
//             }
//         }
//         else {
//             status = 500;
//             result.status = status;
//             result.error = err;
//             res.status(status).send(result);
//         }
//     });
// };






module.exports = {
    find,
    respond,
    create,
    update,
    // getOne,
    // getAll,
    // deleteById,
};