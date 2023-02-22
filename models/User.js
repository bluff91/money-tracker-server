const mongoose = require ('mongoose')


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

module.exports = mongoose.model("user", UserSchema)