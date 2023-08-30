'use strict';

const { sign, verify } = require('jsonwebtoken');

class AuthorizationsUtil {

    constructor() {
        this.algorithm = 'HS512';
        this.secret = process.env.JWT_SECRET;
    }

    createToken(authorization, options) {
        return sign(
            { id: authorization.id },
            this.secret,
            Object.assign({ algorithm: this.algorithm, expiresIn: '10m' }, options)
        );
    }

    verifyToken(token) {
        return verify(token, this.secret, this.algorithm);
    }

}

module.exports = new AuthorizationsUtil();