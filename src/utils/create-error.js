const createError = (message, statusCode) => {
    console.log(error)
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}
module.exports = createError;
