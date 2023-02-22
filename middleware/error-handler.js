// const CustomAPIError = require('../errors/custom-api')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode,
    message: err.message
  }
  //duplicate email
  if(err && err.code === 11000) {
    customError.statusCode = 400
    customError.message = `Error, duplicate value for ${Object.keys(err.keyValue)}`
  }
  //cast error
  if(err && err.name === 'CastError') {
    customError.statusCode = 400
    customError.message = `Error, invalid id`
  }
  //validation error
  if(err && err.name === 'ValidationError') {
    customError.statusCode = 400
    customError.message = `You need to provide a valid value for: ${Object.keys(err.errors).map(item => item)}`
  }

  // if(err instanceof CustomAPIError) {
  // return res.status(err.statusCode).json({ msg: err.message })
  // }
  res.status(customError.statusCode).json({msg: customError.message})
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = errorHandlerMiddleware