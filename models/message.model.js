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
    setMessageRead: async (id) => {
        try {
            let [rows] = await pool.query('update messages set ? where conversation_id = ?', [{is_read: new Date()}, id])
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
}