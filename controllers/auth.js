const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors/bad-request')
const UnauthenticatedError = require("../errors/unauthenticated")
const bcryptjs = require('bcryptjs')


//validation is taken care of by mangoose
const register = async (req, res) => {
    const user = await User.create(req.body)
    const generatedToken = user.generateToken()
    res.status(StatusCodes.CREATED).json({user, generatedToken})
}

//validation is built in the controller
const login = async (req, res) => {
    console.log("PING")
    const { name, email, password} = req.body
    console.log(`called with name:${name}, email: ${email}, password: ${password}`)
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide valid credentials")
    }
    const user = await User.findOne({email})
    if (user.name !== name) {
        throw new BadRequestError("Incorrect username")
    }
    if (!user) {
        throw new BadRequestError(`User with email ${email} not found`)
    }
    const passCheck = await bcryptjs.compare(password, user.password)
    if (!passCheck) {
        throw new UnauthenticatedError("Access denied, incorrect password")
    }
    const generatedToken = user.generateToken()
    res.status(StatusCodes.OK).json({user, token:generatedToken})
}

module.exports = {
    register, 
    login
    }

