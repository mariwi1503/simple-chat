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

    setConversation: async (data) => {
        try {
            let query = 'insert into conversations set ?'
            let [rows] = await pool.query(query, data)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
}