const mongoose = require ('mongoose')
const bcryptjs = require('bcryptjs')
mongoose.set('strictQuery', true)
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please provide a name"],
        minLength:3,
        maxLength:20,
    },
    email: {
        type:String,
        required:[true, "Please provide a email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,"Please provide a valid email"],
        unique:true
    },
    password: {
        type:String,
        required:[true, "Please provide a password"],
        minLength:6
    }
})

UserSchema.pre('save', async function(req, res, next) {
    const salt = bcryptjs.genSaltSync(10)
    this.password = bcryptjs.hashSync(this.password, salt)
})

UserSchema.methods.generateToken = function() {
    return jwt.sign({name:this.name, email:this.email}, process.env.SECRET, {expiresIn:"30D"})
    // return jwt.encode(process.env.SECRET, {email:this.email, password:this.password},)
}

module.exports = mongoose.model("user", UserSchema)