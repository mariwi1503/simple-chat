"use strict"

const authModel = require('../models/auth.model')
    , bcryptLib = require('../libraries/bcrypt.lib')
    , jwtLib = require('../libraries/jwt.lib')

module.exports = {
    signup: async (req, res) => {
        try {
            let {
                name,
                phone,
                password
            } = req.body

            let user_exist = await authModel.getCustomerByPhone(phone)
            if(user_exist) throw new Error('Nomor sudah terdaftar')

            // secure password
            password = bcryptLib.hasher(password)

            let new_customer = {
                name, phone, password
            }
            // submit user data
            await authModel.signUp(new_customer)
            res.status(201).json({
                status: 'success',
            })
            
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: error.message
            })
        }
    },
    login: async (req, res) => {
        try {
            let { phone, password } = req.body
            let user_exist = await authModel.getCustomerByPhone(phone)
            if(!user_exist) throw new Error('Nomor handphone belum terdaftar')

            // check password
            let password_matched = bcryptLib.checker(password, user_exist.password)
            if(!password_matched) throw new Error('Password anda salah')

            // generate token
            let token = jwtLib.generate({
                id: user_exist.id,
                name: user_exist.name
            })

            res.status(200).json({
                status: 'success',
                token
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}