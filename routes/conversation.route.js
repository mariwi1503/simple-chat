"use strict"

const router = require('express').Router()
    , auth = require('../middleware/authentication')
    , conversationController = require('../controllers/conversation.controller')

router.get('/chat/list', auth.allUser, conversationController.getConversationList)
router.get('/chat/:id', auth.allUser, conversationController.conversationDetail)

module.exports = router;