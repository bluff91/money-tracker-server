




const getAllTasks = async (req, res) => {
    res.send("get all tasks route is ok")
}

const getTask = async (req, res) => {
    res.send ("get a single task is ok")
}

const postTask = async (req, res) => {
    res.send ("post a task is ok")
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