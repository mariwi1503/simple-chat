"use strict"

const pool = require('../config/db.config')

module.exports = {
    getCustomerByPhone: async (phone) => {
        try {
            let query = `select * from users where phone = ?`
            let [[rows]] = await pool.query(query, [phone])
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },
    signUp: async (data) => {
        try {
            let query = 'insert into users set ?'
            let [rows] = await pool.query(query, data)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },

    receiverCheck: async (phone) => {
        try {
            let query = `select id from users where phone = ?`
            let [[rows]] = await pool.query(query, [phone])
            return rows
        } catch (error) {
            throw new Error(error)
        }
    },

    partnerCheck: async (id) => {
        try {
            let query = 'select name, phone from users where id = ?'
            let [rows] = await pool.query(query, id)
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
}