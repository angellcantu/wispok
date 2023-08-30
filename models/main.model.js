'use strict';

const { v4 } = require('uuid');

class Main {

    constructor() {
        this.users = [];
    }

    countUsername(username) {
        return this.users.filter(user => user.username == username).length;
    }

    register(user = {}) {
        user.id = v4();
        this.users.push(user);
        return { message: 'User created successfully' };
    }

    login(user) {
        return this.users.find(item => user.username == item.username && user.password == item.password);
    }

    findById(id) {
        return this.users.find(user => user.id == id);
    }

    findUsersDifferentToMe(id) {
        return this.users.filter(user => user.id != id);
    }

}

module.exports = new Main();