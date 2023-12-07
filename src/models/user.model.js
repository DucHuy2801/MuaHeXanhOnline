const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const accountTypes = {
    ADMIN: 'admin',
    LEADER: 'leader',
    STUDENT: 'student'
}

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type_user: {
        type: DataTypes.ENUM(accountTypes.ADMIN, accountTypes.LEADER, accountTypes.STUDENT),
        allowNull: false
    },
    mssv: {
        type: DataTypes.STRING,
        allowNull: true
    },
    school: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

// Admin
// User.create({
//     username: "admin",
//     password: "123456",
//     fullname: "Nguyen Duc Huy",
//     gmail: "huy.nguyen28012002@hcmut.edu.vn",
//     type_user: accountTypes.ADMIN,
//     mssv: null,
//     school: "Dai hoc Bach Khoa HCM"
// })

// // Community Leaders
// User.create({
//     username: "leader1",
//     password: "123456",
//     fullname: "Leader 1",
//     gmail: "leader1@gmail.com",
//     type_user: accountTypes.LEADER,
//     mssv: null,
//     school: null
// })

// User.create({
//     username: "leader2",
//     password: "456789",
//     fullname: "Leader 2",
//     gmail: "leader2@gmail.com",
//     type_user: accountTypes.LEADER,
//     mssv: null,
//     school: null
// })

module.exports = User;