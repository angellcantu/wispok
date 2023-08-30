'use strict';

class UnprocessableError extends Error {

    constructor(message) {
        super(message || 'Unprocessable Entity');
        this.name = this.constructor.name;
        this.status = 422;
        this.isJson = true;
    }

    toJson() {
        return {
            statusCode: this.status,
            error: 'Unprocessable',
            message: this.message
        };
    }

}

module.exports = UnprocessableError;