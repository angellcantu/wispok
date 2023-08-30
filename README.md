# Wispok Test

* Wispok test by Jose Angel Cantu Alcocer.

## What's the objective?

* Well, the project run a server with different endpoints to manage users in a data structure.

## How is the installation?

* First, it's recommendable create a `.env` file in the root project.
* The file must contain the following variables:
```
# ENVIRONMENTS VARIABLES

NODE_ENV=development
PORT=5012
JWT_SECRET=WISPOK1995
```
* You have two options to run the server:

### 1 - Traditional mode

* In a terminal into the project folder you must to run the following command:
  * `npm install`, with this command you will download all the necessary packages.
  * And then run `npm start` to up the server.

* Optional: You can install the [nodemon](https://www.npmjs.com/package/nodemon) package in the project or in global mode. If you have installed the package then you run the following command: `npm run nodemon`.

### 2 - Shell mode
* If you are using `Linux` or `Mac` then in the root project into a terminal you can run the next shell file: `sh wizpok.sh`, this file check if the project already has installed the necessary packages `./node_modules` if not installed it automatically for you and up the server.

## Endpoints

* `/register`: register a new user sending the username and password data.
* `/login`: create a new session token with the username and password registered.
* `/status`: retrieve a status of the server and the user that is logged, this endpoint needs the the token generated in the `/login` endpoint.
* `/logout`: this endpoint ends the actual session.

## Extra endpoints

* `/me`: retrieve the actual user sending the generated token.
* `/users`: retrieve all the registered users different to the actual user.

## Test cases

- Register:

```
$ curl -i -X POST -u almendra@email.com:qweqweqwe http://localhost:5012/register

- Response
{
    "message": "User created successfully"
}
```

- Login:

```
curl -i -X POST -u almendra@email.com:qweqweqwe http://localhost:5012/login

- Response:
{
    "message": "Hi almendra@email.com, welcome to the API system",
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzZjZkNTJjLWQ4NTUtNGE2NC1iZTU3LTNhZDlhOWU0NjRhOCIsImlhdCI6MTY5MzQzODkzNSwiZXhwIjoxNjkzNDM5MDU1fQ.3Pbz7dCNk8dTe2ISEMVotDt2kvCXGD1ay1aJ6qhNuWkvOcvlWISlSYwF5pDfeVp_SC_DvD0FLk9ar2qT9k5y_Q"
}
```

- Status:

```
curl -i -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmODE0Y2I1LTA3ODktNGMxNi05MjI0LTQ5ZTVlMGY0MDE4OSIsImlhdCI6MTY5MzQyNzA1NywiZXhwIjoxNjkzNDI3MTc3fQ.qJf7x_HfZetH8hLC6ffFKM_h1FepLNoOeQxGIkRf9LGfBfv-rtdQPaJeR2fg2eFL-jJKkhuLwRoKH_PZv30bbQ' http://localhost:5012/status

- Response:
{
    "message": "Hi almendra@email.com, the API system is up and running",
    "time": "2023-08-30T23:44:16.195Z"
}
```

- Logout:

```
curl -i -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmODE0Y2I1LTA3ODktNGMxNi05MjI0LTQ5ZTVlMGY0MDE4OSIsImlhdCI6MTY5MzQyNzA1NywiZXhwIjoxNjkzNDI3MTc3fQ.qJf7x_HfZetH8hLC6ffFKM_h1FepLNoOeQxGIkRf9LGfBfv-rtdQPaJeR2fg2eFL-jJKkhuLwRoKH_PZv30bbQ' http://localhost:5012/logout

- Response:
{
    "message": "Bye almendra@email.com, your token has been revoked"
}
```

- Me:

```
curl -i -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmODE0Y2I1LTA3ODktNGMxNi05MjI0LTQ5ZTVlMGY0MDE4OSIsImlhdCI6MTY5MzQyNzA1NywiZXhwIjoxNjkzNDI3MTc3fQ.qJf7x_HfZetH8hLC6ffFKM_h1FepLNoOeQxGIkRf9LGfBfv-rtdQPaJeR2fg2eFL-jJKkhuLwRoKH_PZv30bbQ' http://localhost:5012/me

- Response:
{
    "username": "almendra@email.com",
    "password": "qweqweqwe",
    "id": "23f6d52c-d855-4a64-be57-3ad9a9e464a8"
}
```

- Users:

```
curl -i -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmODE0Y2I1LTA3ODktNGMxNi05MjI0LTQ5ZTVlMGY0MDE4OSIsImlhdCI6MTY5MzQyNzA1NywiZXhwIjoxNjkzNDI3MTc3fQ.qJf7x_HfZetH8hLC6ffFKM_h1FepLNoOeQxGIkRf9LGfBfv-rtdQPaJeR2fg2eFL-jJKkhuLwRoKH_PZv30bbQ' http://localhost:5012/users

- Response:
[
    {
        "username": "joset@email.com",
        "password": "qweqweqwe",
        "id": "d0c28990-61f5-4e0d-84c2-b0a52d91b6c8"
    },
    {
        "username": "angel@email.com",
        "password": "qweqweqwe",
        "id": "91c67805-8ab0-49cf-bc5e-e35b797d1659"
    }
]
```

## Testing

* You can run the tests with the following command: `npm run test`.

## Happy code 😃✌️