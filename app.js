"use strict"
const express = require('express')
    , messageRoute = require('./routes/chat.route')
    , port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// global route
app.get('/', (req, res) => {
    res.send('Wellcome to simple-chat API')
})

// unhandled route
app.all('*', (req, res) => {
    res.send('Sepertinya anda tersesat')
})

app.listen(port, () => console.log(`Running on port: ${port}`))