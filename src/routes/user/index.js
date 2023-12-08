'use strict'

const express = require("express")
const userController = require("../../controllers/user.controller")
const applicationController = require("../../controllers/application.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationStudent } = require("../../auth/authUtils")

router.post('', asyncHandler(applicationController.createApplication))
router.get('/all', asyncHandler(userController.getAllStudents))
router.use(authenticationStudent)
router.use('/application/:mssv', asyncHandler(userController.getAllApplicationByMSSV))
router.get('/:mssv', asyncHandler(userController.getStudentByMSSV))
router.patch('/:mssv', asyncHandler(userController.updateInfoStudent))
module.exports = router