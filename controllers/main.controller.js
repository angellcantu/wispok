'use strict';

class MainController {

    index(_req, res, _next) {
        return res.json({ success: true, message: 'The api text' });
    }

}

module.exports = new MainController();