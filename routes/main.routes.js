'use strict';

const { Router } = require('express');
const router = Router();
const { main } = require('../controllers');
const authorization = require('../authorization');

router.get('/', main.index);
router.post('/register', main.register);
router.post('/login', main.login);
router.get('/status', authorization('jsonwebtoken'), main.status);
router.get('/logout', authorization('jsonwebtoken'), main.logout);
router.get('/me', authorization('jsonwebtoken'), main.me);
router.get('/users', authorization('jsonwebtoken'), main.users);

module.exports = router;