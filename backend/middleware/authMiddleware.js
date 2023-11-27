const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // GET THE BEARER TOKEN
            token = req.headers.authorization.split(' ')[1];

            // VERIFY THE TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // GET USER FROM THE TOKEN
            req.user = await User.findById(decoded.id).select('-password')
            
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('User not authenticated')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorised. No token.')
    }
})

module.exports = {protect};