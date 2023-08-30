'use strict';

const http = require('http');
const request = require('supertest');
const app = require('../server');

// Creating the server
const server = http.createServer(app);

beforeAll(done => {
    server.listen(done);
});

afterAll(done => {
    server.close(done);
});

describe('GET Index', () => {
    it('Should return a regard message', async () => {
        let response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('POST Register', () => {
    it('Should register a new user', async () => {
        let user = Buffer.from('maria.almendra@email.com:qweqweqwe').toString('base64');
        console.log(user);
        let response = await request(server).post('/register').set('authorization', `Basic ${user}`).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('message');
    });

    it('Should try register the same user', async () => {
        let user = Buffer.from('maria.almendra@email.com:qweqweqwe').toString('base64');
        let response = await request(server).post('/register').set('Authorization', `Basic ${user}`).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(422);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('The username already exists.');
    });
});

describe('POST Login', () => {
    it('Should fail the login with bad credentials', async () => {
        let user = Buffer.from('maria.almendraaa@email.com:qweqweqwe').toString('base64');
        let response = await request(server).post('/login').set('Authorization', `Basic ${user}`).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(404);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User or password are not correct.');
    });

    it('Should login successfully', async () => {
        let user = Buffer.from('maria.almendra@email.com:qweqweqwe').toString('base64');
        let response = await request(server).post('/login').set('Authorization', `Basic ${user}`).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');

        let { token } = response.body;

        // Get the status
        response = await request(server).get('/status').set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('time');

        // Logout
        response = await request(server).get('/logout').set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('message');
    });
});