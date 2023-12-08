'use strict'

const express = require("express")
const applicationController = require("../../controllers/application.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationLeader } = require("../../auth/authUtils")

// router.post('', asyncHandler(applicationController.createApplication))
router.use(authenticationLeader)
router.get('/all', asyncHandler(applicationController.getAllApplication))
router.get('/:apply_id', asyncHandler(applicationController.getApplicationById))
router.patch('/:apply_id', asyncHandler(applicationController.approveApplication))
router.delete('/:apply_id', asyncHandler(applicationController.deleteApplicationById))

module.exports = router