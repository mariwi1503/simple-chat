"use strict"

const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
    generate: (data) => {
        return jwt.sign(data, config.token_secret, {expiresIn:24 * 3600})
    },
    verify: (token) => {
        return jwt.verify(token, config.token_secret)
    }
}
