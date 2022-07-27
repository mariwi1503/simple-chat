"use strict"

const messageModel = require('../models/message.model')
    , conversationModel = require('../models/conversation.model')
    , authModel = require('../models/auth.model')

module.exports = {
    sendNewMessage: async (req, res) => {
        try {
            let { receiver_number, message } = req.body
            let validation = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
            let passed = validation.test(receiver_number)
            if(!passed || (passed && receiver_number.length < 10)) throw new Error('Nomor telephone tidak valid')
            // set number to 08xx fromat
            receiver_number = receiver_number.replace(/(\+62|62)/, '0')
            let user_id = req.user_id

            let receiver_exist = await authModel.receiverCheck(receiver_number)
            if(!receiver_exist) throw new Error(`Nomor ${receiver_number} belum menggunakan simple-chat`)

            
            if(message.length > 0 && message != ' ') {
                // check conversation already exist
                let conversation_exist = await conversationModel.conversationCheck(user_id, receiver_exist.id)
                if(!conversation_exist) {
                    let new_conversation = await conversationModel.setConversation({
                        user_one: user_id, user_two: receiver_exist.id
                    })
                    let message_data = {
                        message,
                        sender: user_id,
                        receiver: receiver_exist.id,
                        conversation_id: new_conversation.insertId
                    }
                    await messageModel.sendNewMessage(message_data)
                } else {

                    let message_data = {
                        message,
                        sender: user_id,
                        receiver: receiver_exist.id,
                        conversation_id: conversation_exist.id
                    }
                    await messageModel.sendNewMessage(message_data)
                }

                res.status(200).json({
                    status: 'success',
                    message: 'Pesan terkirim'
                })
            } else {
                res.status(200).json({
                    status: 'success'
                })
            }
            
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    },
}