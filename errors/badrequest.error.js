'use strict';

class BadRequestError extends Error {

    constructor(message) {
        super(message || 'BadRequest');
        this.name = this.constructor.name;
        this.status = 400;
        this.isJson = true;
    }

    toJSon() {
        return {
            statusCode: this.status,
            error: 'Bad Request',
            message: this.message
        };
    }

}

module.exports = BadRequestError;