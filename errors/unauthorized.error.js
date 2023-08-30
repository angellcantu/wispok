'use strict';

class UnauthorizedError extends Error {

    constructor(message) {
        super(message || 'Unauthorized');
        this.status = 403;
        this.name = this.constructor.name;
        this.isJson = true;
    }

    toJson() {
        return {
            statusCode: this.status,
            error: 'Unauthorized',
            message: this.message
        };
    }

}

module.exports = UnauthorizedError;