'use strict'

const AccessService = require("../services/access.service")
const {OK, CREATED, SuccessResponse} = require("../core/success.response")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const sendMail = require("../utils/sendMail")

const createAccessToken = (user, expiresIn = '30m') => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: expiresIn
    })
}

const createRefreshToken = (user, expiresIn = '30m') => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: expiresIn
    })
}

const validateEmail = (email) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(String(email).toLowerCase())
}

class AccessController {
    register = async (req, res, next) => {
        new CREATED({
            message: "Register successfully",
            metadata: await AccessService.register(req.body),
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        try {
            res.clearCookie('refreshToken', {path: '/v1/api/user/refresh_token'})
            return res.status(200).json({ status: 'Success', message: "Logout successfully!"})
        } catch (error) {
            return res.status(500).json({ status: 'Fail', message: error.message })
        }
    }

    refreshToken = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken || req.query.refreshToken
            if (!refreshToken) {
                return res.status(403).json({ status: 'Fail', message: 'Please to register or login' })
            }
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (error, user) => {
                    if (error) {
                        return res.status(419).json({ status: 'Fail', message: 'Please to register or login' })
                    }
                    
                    const accessToken = createAccessToken({ mssv: foundUser.mssv, id: foundUser.id })
                    return res.json({status: 'Success', user, accessToken})
                }
            )
        } catch (error) {
            return res.status(500).json({ status: 'Fail', message: error.message })
        }
    }

    forgotPassword = async (req, res, next) => {
        try {
            const { gmail } = req.body
            const user = await User.findOne({ where: {gmail}})
            if (!user) {
                return res.status(404).json({status: 'Fail', message: "Gmail is not used by account!"})
            }
            const accessToken = createAccessToken({id: user.id, type_user: "student"}, '30m')

            const url = `${process.env.CLIENT_URL}/resetpassword/${accessToken}`
            const fullname = user.fullname

            sendMail(gmail, url, fullname, '30m')
            return res.status(200).json({
				status: 'Success',
				message: 'Send mail, please check to your gmail!',
			})

        } catch (error) {
            return res.status(500).json({ status: 'Fail', message: error.message })
        }
    }

    resetPassword = async (req, res, next) => {
        try {
			const password = req.body.password
			const mssv = req.body.mssv
			const passwordHash = await bcrypt.hash(password, 10)
			const [updatedCount] = await User.update(
                { password: passwordHash },
                { where: { mssv: mssv } }
            )
    
            if (updatedCount === 0) {
                return res
                    .status(400)
                    .json({ status: 'Fail', message: 'Có lỗi xảy ra' })
            }

			return res.status(200).json({
				status: 'Success',
				message: 'Mật khẩu đã được thay đổi thành công',
			})
		} catch (error) {
			return res.status(500).json({ status: 'Fail', message: error.message })
		}
    }
}

module.exports = new AccessController()