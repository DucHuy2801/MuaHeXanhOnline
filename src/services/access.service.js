'use strict'

const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { BadRequestError, AuthFailureError } = require("../core/error.response")

class AccessService {
    static register = async ({username, password, gmail, mssv, school}) => {
        const alreadyExistUser = await User.findOne({ where: {username} });
        if (alreadyExistUser) {
            throw new BadRequestError('Username already exists');
        }
        if (password.length < 6) {
            throw new BadRequestError('Password is weak')
        }

        const hassedpassword = await bcrypt.hash(password, 10)

        if (!mssv) {
            throw new BadRequestError("MSSV isn't empty")
        }

        if (!school) {
            throw new BadRequestError("University isn't empty")
        }

        const newUser = new User({username, password: hassedpassword, gmail, mssv, school, type_user: 'student'});

        const savedUser = await newUser.save()
        .catch((error) => {
            throw new BadRequestError('Cannot register user at the moment')
        })
        if (savedUser) {
            return {
                code: 201,
                metadata: {
                    // user: getInfoData({fields: ['user_id', 'username'], object: savedUser})
                    user_info: savedUser
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
    }

    static login = async ({username, password, refreshToken = null}) => {
        const foundUser = await User.findOne({ where: {username} });
        if (!foundUser) {
            throw new BadRequestError("Username doesn't exist!")
        }

        if (foundUser.type_user === 'student') {
            const match = bcrypt.compareSync(password, foundUser.password)
            if (!match) throw new BadRequestError('Password is wrong!')
        }

        if (foundUser.type_user === "student") {
            const jwtToken = jwt.sign(
                {mssv: foundUser.mssv, id: foundUser.id, type_user: foundUser.type_user},
                process.env.JWT_SECRET
            )
            return {
                code : 200,
                token: jwtToken
            }
        } else {
            const jwtToken = jwt.sign(
                {id: foundUser.id, type_user: foundUser.type_user},
                process.env.JWT_SECRET
            )
            return {
                code : 200,
                token: jwtToken
            }
        }
    }

    static logout = async ({}) => {

    }
}

module.exports = AccessService