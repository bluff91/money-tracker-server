const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')


const auth = function(req, res, next) {
    //check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Authentication invalid")
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.SECRET)
        req.user = {displayName: payload.name, email:payload.email}
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid")
    }
}

module.exports = auth