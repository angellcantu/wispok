'use strict';

const { Router } = require('express');
const router = Router();
const { main } = require('../controllers');

router.get('/', main.index);

module.exports = router;