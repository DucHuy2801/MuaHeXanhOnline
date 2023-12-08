'use strict'

const UserService = require("../services/user.service")
const { SuccessResponse } = require("../core/success.response")

class UserController {
    getStudentByMSSV = async (req, res, next) => {
        const mssv = req.params.mssv;
        const result = await UserService.getStudentByMSSV(mssv);

        if (result.success) {
            res.json(result)
        } else {
            res.status(404).json(result)
        }
    }

    getAllStudents = async (req, res) => {
        new SuccessResponse({
            metadata: await UserService.getAllStudents()
        }).send(res)
    }

    updateInfoStudent = async (req, res) => {
        const mssv = parseInt(req.params.mssv);
        const data_student = req.body;
        const result = await UserService.updateInfoStudent({mssv, data_student})
        if (result.success) {
            res.json(result)
        } else {
            res.status(404).json(result)
        }
    }

    getAllApplicationByMSSV = async(req, res) => {
        new SuccessResponse({
            metadata: await UserService.getAllApplicationByMSSV(req.params.mssv)
        }).send(res)
    }
}

module.exports = new UserController()