'use strict'

const express = require("express")
const accessController = require("../../controllers/access.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationStudent } = require("../../auth/authUtils")

router.post('/user/register', asyncHandler(accessController.register))
router.post('/user/login', asyncHandler(accessController.login))
router.post('/user/forgotpassword', authenticationStudent, asyncHandler(accessController.forgotPassword))
router.post('/user/resetpassword', authenticationStudent, asyncHandler(accessController.resetPassword))

module.exports = router