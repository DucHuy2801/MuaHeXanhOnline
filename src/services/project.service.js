'use strict'

const { BadRequestError } = require("../core/error.response");
const Project = require("../models/project.model");
const statusProject = {
  re_verify: 'Chờ xét duyệt',
  reject: 'Từ chối',
  approve: 'Được xét duyệt'
}

class ProjectService  {
    static postProject = async ({title, location, school, content, current_number, number_of_students}) => {
        const newProject = new Project({title, location, school, content, current_number, number_of_students, status: statusProject.re_verify});

        const savedProject = await newProject.save().catch((error) => {
            console.log("Error: ", error)
            throw new BadRequestError('Error: Cannot post project at the moment')
        })
        if (savedProject) {
            return {
                code: 201,
                message_data: savedProject
            }
        }
        return {
            code: 200,
            metadata: null
        }
        
    }

    static getProjectById = async (project_id) => {
        try {
            const project = await Project.findOne({ where: { project_id } });
            
            if (project) {
              return {
                success: true,
                data: project,
              };
            } else {
              return {
                success: false,
                error: "Project not found",
              };
            }
          } catch (error) {
            console.error('Failed to retrieve project data: ', error);
            return {
              success: false,
              error: "An error occurred",
            };
          }
    }

    static getAllProjects = async () => {
        try {
            const projects = await Project.findAll();
            return {
                success: true,
                data: projects,
            };
        } catch (error) {
          console.error('Failed to retrieve project data: ', error);
          return {
              success: false,
              error: "An error occurred",
          };
        }
    }

    static getVerifiedProject = async () => {
      try {
          const verified_projects = await User.findAll({where: {status: statusProject.approve}});
          return {
              success: true,
              data: verified_projects
          }
      } catch (error) {
          console.error('Failed to retrieve verified projects data: ', error);
          return {
              success: false,
              error: "An error occurred",
          };
      }
  }

    static updateProject = async ({project_id, data_project}) => {
      try {
        const foundProject = await Project.findOne({ where: { project_id } });
        if (!foundProject) {
          throw new BadRequestError('Not found project for updating!');
        }
    
        const [num, updatedRows] = await Project.update(data_project, {
          where: { project_id },
        });
    
        if (num === 1) {
          const updated_project = await Project.findOne({ where: { project_id } });
          return {
            success: true,
            message: "Updating status project successfully!"
            // data: updated_project
          }
        } else {
          return {
            success: false,
            data: 'Updating project failed'
          }
        }
      } catch (err) {
        console.error(err)
      }
    }

    static deleteProjectById = async (projectId) => {
        try {
            const project = await Project.findOne({ where: { project_id: projectId } });
            if (!project) {
              return {
                success: false,
                error: "Project not found",
              };
            }
            await project.destroy();
        
            return {
              success: true,
              message: "Project deleted successfully",
            };
        } catch (error) {
            console.error('Failed to delete project: ', error);
            return {
              success: false,
              error: "An error occurred",
            };
        }
    }

}

module.exports = ProjectService 