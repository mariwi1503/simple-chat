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
            let query = `select * from messages where conversation_id = ?`
            let [rows] = await pool.query(query, id)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },
    lastMessageInChat: async (id) => {
        try {
            let query = `select * from messages where conversation_id = ? order by created_at desc limit 1`
            let [rows] = await pool.query(query, id)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
}