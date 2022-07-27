# Application Name: simple-chat-api

## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```
```
# API List

NEWS API

| Routes | EndPoint                            | Description                                            |
| ------ | ----------------------------------- | ------------------------------------------------------ |
| POST   | /auth/signup                        | register new user                                      |
| POST   | /auth/login                         | login user to get access token                         |
| POST   | /message/send                       | compose new message and send it                        |
| GET    | /chat/list                          | list of all conversation that user involved            |
| GET    | /chat/:id                           | conversation detail with all the messages              |

```
```