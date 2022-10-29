const createHttpError = require('http-errors')
const {
  postCreateProcess,
  getProcess,
  getProcesses,
  updateProcess,
  deleteProcess,
} = require('../services/process')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getProcesses()
      endpointResponse({
        res,
        message: 'processes retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving processes] - [processes - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  getProcess: catchAsync(async (req, res, next) => {
    try {
      const response = await getProcess(req.params.id)
      endpointResponse({
        res,
        message: 'process retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving process] - [process - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  createProcess: catchAsync(async (req, res, next) => {
    try {
      const { params, body } = req
      const response = await postCreateProcess(params.id, body)
      endpointResponse({
        res,
        message: 'create process successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error create process] - [process - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  updateProcess: catchAsync(async (req, res, next) => {
    try {
      const { params, body } = req
      const response = await updateProcess(params.id, body)
      endpointResponse({
        res,
        message: 'update process successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error update process] - [process - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  deleteProcess: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteProcess(req.params.id)
      endpointResponse({
        res,
        message: 'delete process successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error delete process] - [delete - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
