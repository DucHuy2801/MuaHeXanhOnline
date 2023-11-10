'use strict'
const { Request, Response } = require("express");

const User = require('../models/user.model')

const findUserByUsername = async (username) => {
    return await User.findOne({where: {username}})
}

class UserService {
    
    static getStudentByMSSV = async (mssv) => {
        try {
            const student = await User.findOne({where: {mssv}})
            if (student) {
                return {
                    success: true,
                    data: student
                }
            } else {
                return {
                    success: false,
                    error: "Student not found!"
                }
            }
        } catch (error) {
            console.error('Failed to retrieve project data: ', error)
            return {
                success: false,
                error: 'An error occurred'
            }
        }
    }

    static getAllStudents = async () => {
        try {
            const students = await User.findAll({where: {type_user: 'student'}});
            return {
                success: true,
                data: students
            }
        } catch (error) {
            console.error('Failed to retrieve student data: ', error);
            return {
                success: false,
                error: "An error occurred",
            };
        }
    }

    static updateInfoStudent = async ({mssv, data_student}) => {
        try {
            const found_student = await Project.findOne({ where: { mssv } });
            if (!found_student) {
                throw new BadRequestError('Not found student!');
            }
      
            const [num, updatedRows] = await Project.update(data_student, {
                where: { project_id },
            });
      
            if (num === 1) {
                const updated_user = await Project.findOne({ where: { mssv } });
                return {
                    success: true,
                    message: "Updating info student successfully!"
                }
            } else {
                return {
                success: false,
                data: "Updating student's info failed!"
                }
            }
        } catch (err) {
          console.error(err)
        }
    } 
}

module.exports = UserService