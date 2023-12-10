'use strict'

const ProjectService = require("../services/project.service")
const {CREATED, SuccessResponse} = require("../core/success.response")

class ProjectController {
    postProject = async (req, res, next) => {
        console.log("đến đây rồi");
        new CREATED({
            message: "Post project successfully!",
            metadata: await ProjectService.postProject(req.body, req.user)
        }).send(res)
    }

    getProjectByLeader = async (req, res) => {
        try {
            const communityLeaderId = req.user.id;
            new SuccessResponse({
                metadata: await ProjectService.getProjectByLeader(communityLeaderId)
            }).send(res)
        } catch (error) {
            console.log("error", error);
            res.status(500).json({ success : false , error : error});
        }
    }

    getProjectById = async (req, res) => {
        const projectId = req.params.project_id;
      
        const result = await ProjectService.getProjectById(projectId);
      
        if (result.success) {
            res.json(result);
        } else {
            res.status(404).json(result);
        }
    };

    getAllProjects = async (req, res) => {
        new SuccessResponse({
            metadata: await ProjectService.getAllProjects()
        }).send(res)
    };

    getAllProjectsBySchool = async (req, res) => {
        new SuccessResponse({
            metadata: await ProjectService.getAllProjectsBySchool(req.params.school_name)
        }).send(res)
    };

    getAllVerifiedProjects = async (req, res) => {
      new SuccessResponse({
          metadata: await ProjectService.getVerifiedProject()
      }).send(res)
    }

    updateProject = async (req, res) => {
        const project_id = parseInt(req.params.project_id)
        const data_project = req.body;
        const result = await ProjectService.updateProject({project_id, data_project})
        if (result.success) {
            res.json(result);
        } else {
            res.status(404).json(result);
        }
    };

    verifyProject = async (req, res) => {
      const project_id = req.params.project_id;
      const status = req.body.status;
      const verified_project = await ProjectService.verifyProject({project_id, status})
      if (verified_project.success) {
        res.json(verified_project)
      } else {
        res.status(401).json("Unauthorized for verifying status project!")
      }
    }
    
    deleteProjectById = async (req, res) => {
        const projectId = req.params.project_id;
        const result = await ProjectService.deleteProjectById(projectId);
        if (result.success) {
            res.json(result);
        } else {
            res.status(404).json(result);
        }
    };
}

module.exports = new ProjectController()