const Task = require('../models/Task')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const getAllTasks = async (req, res) => {
    req.body.createdBy = req.user.displayName
    const tasks = await Task.find({})
    res.status(StatusCodes.OK).json(tasks)
    // res.send("get all tasks route is ok")
}

const getTask = async (req, res) => {
    res.send ("get a single task is ok")
}

const postTask = async (req, res) => {
    req.body.createdBy = req.user.displayName
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json(task)
}

const updateTask = async (req, res) => {
    res.send ('update task is ok')
}

const deleteTask = async (req, res) => {
    res.send ('delte task is ok')
}

module.exports = {
    getAllTasks,
    getTask,
    postTask,
    updateTask,
    deleteTask

}