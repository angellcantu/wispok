'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();

app.use(cors());
app.use(require('connect-timeout')('20s'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middlewares
app.use(require('./middlewares/request.midd'));

// Globals
const errors = require('./errors');
Object.keys(errors).forEach(attr => global[attr] = errors[attr]);

// Routes
const routes = require('./routes');
Object.keys(routes).forEach(attr => app.use('/', routes[attr]));

// Error handler
app.use((err, _req, res, _next) => {
    let status = err.response && err.response.status ? err.response.status : res.statusCode,
        message = err.message;
    status = err.status || status;
    status = status != 200 ? status : 500;

    if (err.isJson) {
        return res.status(err.status).json(err.toJson());
    }
    res.send(err.message);
});

process.on('unhandledRejection', err => console.error(`ERROR: ${err}`));

module.exports = app;