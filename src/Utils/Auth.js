/* eslint-disable require-atomic-updates */
/* global process */
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    let result;
    if (authorizationHeader) {
        if (authorizationHeader.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: '2d',
                issuer: 'https://buildstuff.lt'
            };
            try {
                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                // Let's pass back the decoded token to the request object
                req.decoded = result;
                // We call next to pass execution to the subsequent middleware
                next();
            } catch (err) {
                // Throw an error just in case anything goes wrong with verification
                throw new Error(err);
            }
        }
        else {
            result = {
                error: 'Bearer token type expected',
                status: 401
            };
            res.status(401).send(result);
        }
    } else {
        result = {
            error: 'Authorization header must be provided',
            status: 401
        };
        res.status(401).send(result);
    }
};
module.exports = { validateToken };