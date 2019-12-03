const User = require('../Models/User');
module.exports = {
    create: (req, res) => {
        let result = {};
        let status = 201;
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
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
    },
    getAll: (req, res) => {
        let result = {};
        let status = 200;
        const payload = req.decoded;
        if (payload) {
            User.find({}, (err, users) => {
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
    },
    getOne: (req, res) => {
        User.findById(req.params.id)
            .then((user) => {
                if (user) {
                    res.status(200).json();
                }
                else {
                    res.status(404).json({ error: "Not found" });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors
                });
            });
    },
    update: (req, res) => {
        User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            .then((user) => {
                if (user) {
                    res.status(200).json();
                }
                else {
                    res.status(404).json({ error: "Not found" });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors
                });
            });
    },
    delete: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then((user) => {
                if (user) {
                    res.status(204).json();
                }
                else {
                    res.status(404).json({ error: "Not found" });
                }
            })
            .catch((errors) => {
                res.status(500).json({
                    errors
                });
            });
    }
};