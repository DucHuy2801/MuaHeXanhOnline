'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const Project = require("../models/project.model");
const User = require("../models/user.model");
const statusProject = {
  re_verify: 'Chờ xét duyệt',
  reject: 'Từ chối',
  approve: 'Được xét duyệt'
}

class ProjectService  {
    static postProject = async ({title, location, school, content, number_of_students}) => {
        const newProject = new Project({title, location, school, content, number_of_students, current_number : 0, status: statusProject.re_verify});

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

    static verifyProject = async ({project_id, status}) => {
        try {
            const foundProject = await Project.findOne({ where: { project_id } });
            if (!foundProject) {
                throw new BadRequestError('Not found project for updating!');
            }
        
            const [num, updatedRows] = await Project.update({status: status}, {
                where: { project_id },
            });
        
            if (num === 1) {
                return {
                    success: true,
                    message: "Updating status project successfully!"
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

    static getVerifiedProject = async () => {
        try {
            const verified_projects = await Project.findAll({where: {status: statusProject.approve}});
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

    static updateSlotProject = async (projectId) => {

    }

    static applyProject = async ({projectId, mssv}) => {
        try {
            const foundProject = await Project.findOne({ where: { project_id: projectId } });
            if (!foundProject) {
                throw new NotFoundError("Not found project!")
            }
            const student = await User.findOne({ where: {mssv}})
            if (!student) throw new NotFoundError("Not found student!")

            if (foundProject.status !== statusProject.approve  || foundProject.current_number === foundProject.number_of_students) 
                throw new BadRequestError("Can't apply project")

            foundProject.current_number += 1;
            await foundProject.save()
            
            return {
                success: true,
                message: "Student applies project successfully!"
            }
        } catch (err) {
            console.error('Failed to apply to project:', err);
            return {
                success: false,
                message: "Can't apply to project"
            }
        }
    }
}

module.exports = ProjectService 