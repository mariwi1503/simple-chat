# Application Name: simple-chat-api

## Installation
```bash
$ cd simple-chat
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
POST /auth/signup
req.body = ( name: string, phone: string, password: string )

POST /auth/login
req.body = ( phone: string, password: string )

POST /message/send
req.body = (reciver_number: string, message: text)

GET /chat/list
req.user_id

GET /chat/:id
req.params = (id: number)
```