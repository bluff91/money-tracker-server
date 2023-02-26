const mongoose = require('mongoose')
// const User = require('./User')


const TaskSchema = new mongoose.Schema({
    transactionName:{
        type:String,
        require:[true, "Please provide a name for the task"],
        unique:true,
        maxLength:[80, "Transaction Name is too big"]
    },

    transactionPrice:{
        type:Number,
        require:[true, "Please provide a cost"],
        min:0.1,
    },
    createdBy: {
        type:String,
        required:[true, "Please provide an User"]
    }
           
}, {timestamps: true})

module.exports = mongoose.model("Task", TaskSchema)