const BadRequestError = require('./bad-request')
const UnAuthenticatedError = require('./unauthenticated')
const NotFoundError   = require('./notfound')
const CustomApiError = require('./custom-error')


module.exports = {
    BadRequestError,
    UnAuthenticatedError,
    NotFoundError, 
    CustomApiError }