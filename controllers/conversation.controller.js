"use strict"

const conversationModel = require('../models/conversation.model')
    , messageModel = require('../models/message.model')
    , async = require('async')

module.exports = {
    // related to the user
    getConversationList: async (req, res) => {
        try {
            let user_id = req.user_id
            let conversation_list = await conversationModel.conversationList(user_id)

            await async.forEachOf(conversation_list, async (x) => {
                x.chat = await messageModel.lastMessageInChat(x.id)
            })
            res.status(200).json({
                status: 'success',
                data: conversation_list.length > 0 ? conversation_list : null
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    },

    conversationDetail: async (req, res) => {
        try {
            let conversation_id = req.params.id
            console.log("🚀 ~ file: conversation.controller.js ~ line 32 ~ conversationDetail: ~ conversation_id", conversation_id)
            let result = await conversationModel.getConversationById(conversation_id)
            if(!result) throw new Error('Chat tidak ditemukan')

            result.chat = await messageModel.getAllMessagePerChat(conversation_id)
            res.status(200).json({
                status: 'success',
                data: result
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    },
}