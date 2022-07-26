"use strict"

const chatModel = require('../models/message.model')
    , authModel = require('../models/auth.model')

module.exports = {
    sendNewMessage: async (req, res) => {
        try {
            let { receiver_number, message } = req.body
            let user_id = req.user_id

            let receiver_exist = await authModel.receiverCheck(receiver_number)
            if(!receiver_exist) throw new Error(`Nomor ${receiver_number} belum menggunakan simple-chat`)

            let message_data = {
                message,
                sender_id: user_id,
                receiver_id: receiver_exist.id
            }
            let sending = await chatModel.sendNewMessage(message_data)
            
            let conversation = {
                message_id: sending.insertId,
                participant: `${user_id, receiver_exist.id}`
            }

            await chatModel.setConversation(conversation)

            res.status(200).json({
                status: 'success'
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}