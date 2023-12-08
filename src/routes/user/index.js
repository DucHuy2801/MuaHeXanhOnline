'use strict'

const express = require("express")
const userController = require("../../controllers/user.controller")
const applicationController = require("../../controllers/application.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationStudent } = require("../../auth/authUtils")

router.get('/all', asyncHandler(userController.getAllStudents))
router.get('/:mssv', asyncHandler(userController.getStudentByMSSV))
router.use(authenticationStudent)
router.post('/apply', asyncHandler(applicationController.createApplication))
router.use('/application/:mssv', asyncHandler(userController.getAllApplicationByMSSV))
router.patch('/:mssv', asyncHandler(userController.updateInfoStudent))
module.exports = router