const bcrypt = require('bcrypt');
const User = require('../Models/User');
const { generateAccessToken, generateRefreshToken } = require('../Utils/Auth');

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        let result = {};
        let status = 200;
        User.findOne({ email }, (err, user) => {
            if (!err && user) {
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        status = 200;
                        result.accessToken = `Bearer ${generateAccessToken(user)}`;
                        result.refreshToken = generateRefreshToken(user);

                        result.status = status;
                        result.result = user;
                    } else {
                        status = 401;
                        result.status = status;
                        result.error = 'Authentication error.';
                    }
                    res.status(status)
                        .cookie('refreshToken', result.refreshToken, { sameSite: 'None', secure: true, maxAge: process.env.REFRESH_TOKEN_LIFE * 60 * 1000 })
                        .send(result);
                }).catch(err => {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                });
            } else {
                status = 404;
                result.status = status;
                result.error = "User does not exist.";
                res.status(status).send(result);
            }
        });
    },
    signup: (req, res) => {
        let result = {};
        let status = 201;
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        user.save((err, user) => {
            if (!err) {
                result.status = status;
                result.result = user;
                result.accessToken = `Bearer ${generateAccessToken(user)}`;
                result.refreshToken = generateRefreshToken({ ...user, password: password });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status)
                .cookie('refreshToken', result.refreshToken, { sameSite: 'Secure', maxAge: process.env.REFRESH_TOKEN_LIFE * 60 * 1000 })
                .send(result);
        });
    },
    token: (req, res) => {
        let result = {};
        // console.log(req.decoded);
        User.findOne({ email: req.decoded.user })
            .then(user => {
                // console.log(user);
                if (user) {
                    let tokenBody = { user: user.email, role: user.role }

                    result.accessToken = generateAccessToken(user);
                    res.status(200).send(result);

                } else
                    res.status(404).send({ error: "no such user" });
            })
            .catch((errors) => {
                res.status(500).json({ errors });
            })


    }
}