"use strict"

const router = require('express').Router()
    , authController = require('../controllers/auth.controller')

router.post('/auth/signup', authController.signup)
router.post('/auth/login', authController.login)

module.exports = router