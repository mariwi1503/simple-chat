"use strict"

const pool = require('../config/db.config')

module.exports = {
    sendNewMessage: async (data) => {
        try {
            let query = 'INSERT INTO messages SET ?'
            let [rows] = await pool.query(query, data)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },
    getAllMessagePerChat: async (id) => {
        try {
            let query = `select * from messages where conversation_id = ? order by created_at desc`
            let [rows] = await pool.query(query, id)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },
    setMessageRead: async (conversation_id, user_id) => {
        try {
            let [rows] = await pool.query('update messages set ? where conversation_id = ? and receiver = ?', [{is_read: new Date()}, conversation_id, user_id])
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
}