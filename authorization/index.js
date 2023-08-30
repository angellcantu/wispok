'use strict';

const authorizations = {
    jsonwebtoken: require('./jsonwebtoken.auth')
};

module.exports = type => async (req, res, next) => {
    try {
        return await authorizations[type](req, res, next);
    } catch (error) {
        next(error);
    }
};