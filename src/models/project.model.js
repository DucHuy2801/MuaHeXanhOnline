const { DataTypes } = require("sequelize")
const sequelize = require('../database/index.js')
const Admin = require("../models/uni_admin.model.js")

const statusProject = {
    re_verify: 'Chờ xét duyệt',
    reject: 'Từ chối',
    approve: 'Được xét duyệt'
}

const Project = sequelize.define('project', {
    project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    current_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    number_of_students: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(statusProject.re_verify, statusProject.reject, statusProject.approve),
        allowNull: false
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


// Project.belongsTo(Admin, { foreignKey: 'adminId', allowNull: true });
module.exports = Project
