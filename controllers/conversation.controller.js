"use strict"

const conversationModel = require('../models/conversation.model')
    , messageModel = require('../models/message.model')
    , authModel = require('../models/auth.model')
    , async = require('async')

module.exports = {
    // related to the user
    getConversationList: async (req, res) => {
        try {
            let user_id = req.user_id
            let conversation_list = await conversationModel.conversationList(user_id)
            await async.forEachOf(conversation_list, async (x) => {
                let partner_id = x.user_one == user_id ? x.user_two : x.user_one 
                x.partner = await authModel.partnerCheck(partner_id)
                let chats = await messageModel.getAllMessagePerChat(x.id)
                let unread = 0
                chats.map((x) => {
                    if(x.is_read == null && x.receiver == user_id) unread += 1
                })
                x.unread = unread
                x.last_message = chats[0]

            })
            res.status(200).json({
                status: 'success',
                data: conversation_list.length > 0 ? conversation_list : 'Belum ada conversation'
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
            let matched_id = /^\d+$/.test(conversation_id)
            if(!matched_id) throw new Error('format id salah')
            let result = await conversationModel.getConversationById(conversation_id)
            if(!result) throw new Error('Chat tidak ditemukan')

            result.chat = await messageModel.getAllMessagePerChat(conversation_id)
            // set message status as read
            let user_id = req.user_id
            await messageModel.setMessageRead(conversation_id, user_id)
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