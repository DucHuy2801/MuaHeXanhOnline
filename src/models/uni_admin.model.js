const { DataTypes } = require("sequelize")
const sequelize = require("../database/index")
const Project = require("./project.model")

const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    university: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Admin