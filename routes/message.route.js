"use strict"

const router = require('express').Router()
    , auth = require('../middleware/authentication')
    , messageController = require('../controllers/message.controller')

router.post('/message/send', auth.allUser,messageController.sendNewMessage)

module.exports = router