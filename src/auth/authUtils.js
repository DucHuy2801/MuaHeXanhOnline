'use strict'

const JWT = require('jsonwebtoken')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { asyncHandler } = require('../helpers/asyncHandler')
const HEADER = {
    AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.err(`error verify::`, err)
            } else {
                console.log(`decode verify::`, decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

const authenticationStudent = asyncHandler(async (req, res, next) => {
    const token = req.headers[HEADER.AUTHORIZATION]
    if (!token) throw new AuthFailureError('Invalid Request')

    try {
        const decodeUser = JWT.decode(token)
        console.log(`decodeUser`, decodeUser)
        if (decodeUser.type_user !== 'student') throw new AuthFailureError('Unauthorized')
        req.user = decodeUser
        return next()
    } catch (error) {
        console.log(error)
    }
})

const authenticationAdmin = asyncHandler(async (req, res, next) => {
    const token = req.headers[HEADER.AUTHORIZATION]
    if (!token) throw new AuthFailureError('Invalid Request')

    try {
        const decodeUser = JWT.decode(token)
        console.log(`decodeUser`, decodeUser)
        if (decodeUser.type_user !== 'admin') throw new AuthFailureError('Unauthorized')
        req.user = decodeUser
        return next()
    } catch (error) {
        console.log(error)
    }
})

// const authenticationLeader = asyncHandler(async (req, res, next) => {
//     const token = req.headers[HEADER.AUTHORIZATION]
//     if (!token) throw new AuthFailureError('Invalid Request')

//     try {
//         const decodeUser = JWT.decode(token)
//         console.log(`decodeUser`, decodeUser)
//         if (decodeUser.type_user !== 'leader') throw new AuthFailureError('Unauthorized')
//         req.user = decodeUser
//         return next()
//     } catch (error) {
//         console.log(error)
//     }
// })

const authenticationLeader = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers[HEADER.AUTHORIZATION];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AuthFailureError('Invalid Authorization Header');
    }

    const token = authHeader.slice(7); // Loại bỏ phần "Bearer "
    console.log("token: ", token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // JWT không hợp lệ
            res.status(500).json({ error: err });
            console.error('JWT verification failed:', err);
        } else {
            // JWT hợp lệ, decoded chứa thông tin từ payload
            console.log('Decoded JWT:', decoded);
            if (decoded.type_user !== 'leader') throw new AuthFailureError('Unauthorized')
            req.user = decoded
            return next()
        }
    });
})

module.exports = {
    createTokenPair,
    verifyJWT,
    authenticationAdmin,
    authenticationLeader,
    authenticationStudent
}