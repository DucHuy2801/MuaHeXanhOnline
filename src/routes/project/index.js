'use strict'

const express = require("express")
const projectController = require("../../controllers/project.controller")
const router = express.Router()
const { asyncHandler } = require("../../helpers/asyncHandler")
const { authenticationAdmin } = require("../../auth/authUtils")
const { authenticationLeader } = require("../../auth/authUtils")

router.post('', authenticationLeader, projectController.postProject)
router.get('/getProjectByLeader',authenticationLeader ,projectController.getProjectByLeader)
router.get('/all', asyncHandler(projectController.getAllProjects))
router.get('/all/:school_name', asyncHandler(projectController.getAllProjectsBySchool))
router.get('/:project_id', authenticationLeader, asyncHandler(projectController.getProjectById))
router.patch('/:project_id',authenticationLeader, asyncHandler(projectController.updateProject))
router.delete('/:project_id', authenticationLeader, projectController.deleteProjectById)
router.patch('/verify/:project_id', authenticationAdmin, asyncHandler(projectController.verifyProject))

module.exports = router