const createHttpError = require('http-errors')
const { postCreateProcessys, getProcessys } = require('../services/processys')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getProcessys()
      endpointResponse({
        res,
        message: 'processys retrieved successfully',
        body: { count: response.length, response },
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving processys] - [processys - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  createProcesssys: catchAsync(async (req, res, next) => {
    try {
      const response = await postCreateProcessys()
      endpointResponse({
        res,
        message: 'process successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error create processys] - [processys - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
