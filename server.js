'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();

// Routes
const routes = require('./routes');
Object.keys(routes).forEach(attr => {
    app.use('/', routes[attr]);
});

app.use(cors());
app.use(require('connect-timeout')('20s'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.on('unhandledRejection', err => console.error(`ERROR: ${err}`));

module.exports = app;