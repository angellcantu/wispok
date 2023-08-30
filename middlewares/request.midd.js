'use strict';

module.exports = (req, _res, next) => {
    if (req.headers && req.headers.authorization) {
        let body = Buffer.from(req.headers.authorization.replace('Basic', ''), 'base64').toString('ascii'),
            [username, password] = body.split(':');
        req.body = { username, password };
    }
    return next();
};