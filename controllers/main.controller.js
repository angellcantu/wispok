'use strict';

const { main } = require('../models');
const { authorization } = require('../utils');

class MainController {

    index(_req, res, _next) {
        return res.json({ success: true, message: 'The API system is up' });
    }

    register(req, res, next) {
        try {
            if (!Object.keys(req.body).length) {
                throw new UnauthorizedError('Username and password are required.');
            }
            let { username, password } = req.body;
            let count = main.countUsername(username);
            if (count) {
                throw new UnprocessableError('The username already exists.');
            }
            let register = main.register({ username, password });
            return res.json(register);
        } catch (error) {
            next(error);
        }
    }

    login(req, res, next) {
        try {
            let user = main.login(req.body);
            if (!user) {
                throw new NotFoundError('User or password are not correct');
            }
            let token = authorization.createToken(user);
            return res.json({
                message: `Hi ${user.username}, welcome to the API system`,
                token: token
            });
        } catch (error) {
            next(error);
        }
    }

    status(_req, res, next) {
        try {
            let user = main.findById(res.locals.auth);
            if (!user) {
                throw new NotFoundError('The user does not exist');
            }
            return res.json({
                message: `Hi ${user.username}, the API system is up and running`,
                time: new Date()
            });
        } catch (error) {
            next(error);
        }
    }

    logout(_req, res, next) {
        try {
            let user = main.findById(res.locals.auth);
            if (!user) {
                throw new NotFoundError('The user does not exist');
            }
            return res.json({ message: `Bye ${user.username}, your token has been revoked` });
        } catch (error) {
            next(error);
        }
    }

    me(_req, res, next) {
        try {
            let user = main.findById(res.locals.auth);
            if (!user) {
                throw new NotFoundError('The user does not exist.');
            }
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    users(_req, res, next) {
        try {
            let users = main.findUsersDifferentToMe(res.locals.auth);
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new MainController();