'use strict';

const { authorization } = require('../utils');

module.exports = (req, res, next) => {
    try {
        let doc = authorization.verifyToken(req.headers.authorization);
        res.locals.auth = String(doc.id);
        if (!res.locals.auth) {
            // Not found error exception
            throw Error('The account does not exist');
        }
        return next();
    } catch (error) {
        throw Error(error);
        return next(error);
    }
};