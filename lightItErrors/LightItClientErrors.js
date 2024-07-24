class BadRequestError {
    constructor(message) {
        this.message = message;
        this.statusCode = 400;
    }
}

class ForbiddenError {
    constructor(message) {
        this.message = message;
        this.statusCode = 403;
    }
}

module.exports = { BadRequestError, ForbiddenError };