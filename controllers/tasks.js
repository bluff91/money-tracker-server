const Task = require('../models/Task')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const getAllTasks = async (req, res) => {
    req.body.createdBy = req.user.displayName
    const tasks = await Task.find({}).select("-__v")
    res.status(StatusCodes.OK).json({tasks, nrHits:tasks.length})
}

const getTask = async (req, res) => {
    req.body.createdBy = req.user.displayName
    console.log(req.params.id)
    const task = await Task.findOne({_id:req.params.id})
    if (!task) {
        throw new NotFoundError(`Task with id ${req.params.id} not found`)
    }
    res.status(StatusCodes.OK).json({task})
}

const postTask = async (req, res) => {
    req.body.createdBy = req.user.displayName
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json(task)
}

const updateTask = async (req, res) => {
    req.body.createdBy = req.user.displayName
    const task = await Task.findOneAndUpdate({_id:req.params.id}, 
                {transactionPrice:req.body.transactionPrice, transactionName:req.body.transactionName},
                {new:true})
    if (!task) {
        throw new NotFoundError(`Task with id ${req.params.id} not found`)
    }
    res.status(StatusCodes.OK).json(task)
}

const deleteTask = async (req, res) => {
    req.body.createdBy = req.user.displayName
    const task = await Task.findOneAndDelete({_id:req.params.id})
    if (!task) {
        throw new NotFoundError(`Task with id ${req.params.id} not found`)
    }
    res.status(StatusCodes.OK).json(task)
}

module.exports = {
    getAllTasks,
    getTask,
    postTask,
    updateTask,
    deleteTask
}