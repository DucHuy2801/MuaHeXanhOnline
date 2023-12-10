'use strict'

const express = require("express")
const userController = require("../../controllers/user.controller")
const applicationController = require("../../controllers/application.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationStudent } = require("../../auth/authUtils")

router.get('/all', asyncHandler(userController.getAllStudents))
router.get('/:mssv', asyncHandler(userController.getStudentByMSSV))
router.post('/apply', authenticationStudent, asyncHandler(applicationController.createApplication))
router.use('/application/:mssv', authenticationStudent, asyncHandler(userController.getAllApplicationByMSSV))
router.patch('/:mssv', authenticationStudent, asyncHandler(userController.updateInfoStudent))
module.exports = router