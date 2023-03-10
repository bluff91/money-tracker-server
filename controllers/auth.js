const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const NotFoundError = require('../errors/not-found')
const UnauthenticatedError = require("../errors/unauthenticated")
const bcryptjs = require('bcryptjs')


//validation is taken care of by mongoose
const register = async (req, res) => {
    const user = await User.create(req.body)
    const generatedToken = user.generateToken()
    res.status(StatusCodes.CREATED).json({email:user.email, user:user.name, generatedToken})
}

//validation is built in the controller
const login = async (req, res) => {
    console.log("PING")
    const {email, password} = req.body
    console.log(`called with email: ${email}, password: ${password}`)
    if (!email || !password) {
        throw new BadRequestError("Please provide valid credentials")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new NotFoundError(`User with email ${email} not found`)
    }
    const passCheck = await bcryptjs.compare(password, user.password)
    if (!passCheck) {
        throw new UnauthenticatedError("Access denied, incorrect password")
    }
    const generatedToken = user.generateToken()
    res.status(StatusCodes.OK).json({email:user.email, user:user.name, token:generatedToken})
}

module.exports = {
    register, 
    login
    }

