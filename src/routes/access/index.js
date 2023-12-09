'use strict'

const express = require("express")
const accessController = require("../../controllers/access.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationStudent } = require("../../auth/authUtils")

router.post('/user/register', asyncHandler(accessController.register))
router.post('/user/login', asyncHandler(accessController.login))
router.use(authenticationStudent)
router.post('/user/forgotpassword', asyncHandler(accessController.forgotPassword))
router.post('/user/resetpassword', asyncHandler(accessController.resetPassword))

module.exports = router