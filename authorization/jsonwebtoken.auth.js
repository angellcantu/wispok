'use strict';

const { TokenExpiredError } = require('jsonwebtoken');
const { authorization } = require('../utils');

module.exports = (req, res, next) => {
    try {
        let doc = authorization.verifyToken(req.headers.authorization.replace('Bearer ', ''));
        res.locals.auth = String(doc.id);
        if (!res.locals.auth) {
            throw new NotFoundError('The user does not exist');
        }
        return next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new UnauthorizedError('The token has expired');
        }
        if (error.message == 'jwt malformed') {
            throw new UnauthorizedError('JWT malformed');
        }
        if (error.message == 'invalid signature') {
            throw new UnauthorizedError('Invalid signature in JWT');
        }
        if (error.message == 'jwt must be provided') {
            throw new UnauthorizedError('JWT must be provided');
        }
        return next(error);
    }
};