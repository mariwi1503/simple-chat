"use strict"
const express = require('express')
    , authRoute = require('./routes/auth.route')
    , messageRoute = require('./routes/message.route')
    , conversationRoute = require('./routes/conversation.route')

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(
    '/',
    authRoute,
    messageRoute,
    conversationRoute
)

// global route
app.get('/', (req, res) => {
    res.send('Wellcome to simple-chat API')
})

// unhandled route
app.all('*', (req, res) => {
    res.send('Sepertinya anda tersesat')
})

app.listen(port, () => console.log(`Running on port: ${port}`))