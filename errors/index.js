'use strict';

const badRequest = require('./badrequest.error');
const conflict = require('./conflict.error');
const forbidden = require('./forbidden.error');
const notFound = require('./notfound.error');
const unauthorized = require('./unauthorized.error');
const unprocessable = require('./unprocessable.error');

module.exports = {
    badRequest,
    conflict,
    forbidden,
    notFound,
    unauthorized,
    unprocessable
};