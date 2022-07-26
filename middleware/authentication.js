"use strict"

const jwtLib = require('../libraries/jwt.lib')
    , config = require('../config')

module.exports = {
    allUser: async (req, res, next) => {
        try {
            let token = req.header('Authorization')
            if(!token) throw new Error('Acces denied!')

            let verified = jwtLib.verify(token, config.token_secret)
            if(!verified) throw new Error('Unauthorized')

            req.customer_id = verified.id
            req.customer = verified

            next()
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: error.message
            })
        }
    },
    admin: async (req, res, next) => {
        try {
            let token = req.header('Authorization')
            if(!token) throw new Error('Acces denied!')

            let verified = jwtLib.verify(token, config.token_secret)
            console.log("🚀 ~ file: authentication.js ~ line 32 ~ admin: ~ verified", verified)
            if(verified.level !== 'admin') throw new Error('Admin only!')
            if(!verified) throw new Error('Unauthorized')

            req.customer_id = verified.id
            req.customer = verified

            next()
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}