const express = require('express')
const router = express.Router()


const {
    getAllTasks,
    getTask,
    postTask,
    updateTask,
    deleteTask,
    } = require('../controllers/tasks')

router.get("/", getAllTasks)
router.get("/:id", getTask)
router.post("/", postTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router



