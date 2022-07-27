"use strict"

const pool = require('../config/db.config')

module.exports = {
    setConversation: async (data) => {
        try {
            let query = 'insert into conversations set ?'
            let [rows] = await pool.query(query, data)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },
    getConversationById: async (id) => {
        try {
            let [[rows]] = await pool.query('select * from conversations where id = ?', id)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },

    conversationCheck: async (user1, user2) => {
        try {
            let query = `select * from conversations
                where (user_one = ${user1} && user_two = ${user2})
                or (user_one = ${user2} && user_two = ${user1})`
            let [[rows]] = await pool.query(query)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },
    conversationList: async (user_id) => {
        try {
            let query = `select * from conversations where user_one = ${user_id} or user_two = ${user_id}`
            let [rows] = await pool.query(query)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
}