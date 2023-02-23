require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./db/connection')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/tasks')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')




app.use(express.json())

app.use('/auth', authRouter)
app.use('/tasks', taskRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = 5000 || process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MANGO_URL)
        app.listen(port, () => console.log(`Server started on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
