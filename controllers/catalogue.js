const createHttpError = require('http-errors')
const {
  postCreateCatalogue,
  getCatalogue,
  getCatalogues,
  updateCatalogue,
  deleteCatalogue,
} = require('../services/catalogue')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getCatalogues()
      endpointResponse({
        res,
        message: 'Cataloguees retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving cataloguees] - [cataloguees - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  getCatalogue: catchAsync(async (req, res, next) => {
    try {
      const response = await getCatalogue(req.params.id)
      endpointResponse({
        res,
        message: 'catalogue retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving catalogue] - [catalogue - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  createCatalogue: catchAsync(async (req, res, next) => {
    try {
      const response = await postCreateCatalogue(req.body)
      endpointResponse({
        res,
        message: 'create catalogue successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error create catalogue] - [catalogue - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  updateCatalogue: catchAsync(async (req, res, next) => {
    try {
      const { params, body } = req
      const response = await updateCatalogue(params.id, body)
      endpointResponse({
        res,
        message: 'update catalogue successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error update catalogue] - [catalogue - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  deleteCatalogue: catchAsync(async (req, res, next) => {
    try {
      const response = await deleteCatalogue(req.params.id)
      endpointResponse({
        res,
        message: 'delete catalogue successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error delete catalogue] - [delete - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
