const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Please provide a name for the task"],
        unique:true
    },

    price:{
        type:Number,
        require:[true, "Please provide a cost"]
        
    }
})

module.exports = mongoose.model("task", TaskSchema)