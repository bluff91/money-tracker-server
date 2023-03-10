require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connection')
const authRouter = require('./routes/auth')
const taskRouter = require('./routes/tasks')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const taskMiddleware = require('./middleware/auth')

//security
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
})
app.use(limiter)
app.use(helmet())
app.use(cors())
app.use(xss())


app.use(express.json())

app.use('/auth', authRouter)
app.use('/tasks', taskMiddleware, taskRouter)


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
