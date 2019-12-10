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
            res.status(status).json(result);
        });
    },
    getAll: (req, res) => {
        const payload = req.decoded;
        if (payload) {
            User.find({}, (err, users) => {
                if (!err) {
                    res.status(200).json(users);
                } else {
                    res.status(500).json(err);
                }
            });
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    },
    getOne: (req, res) => {
        User.findById(req.params.id)
            .then((user) => {
                if (user) {
                    res.status(200).json({ user });
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
                    res.status(204).json({});
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