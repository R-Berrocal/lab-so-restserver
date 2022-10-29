const { ErrorObject } = require('../helpers/error')
const { Process, Catalogue } = require('../database/models')

exports.getCatalogues = async () => {
  try {
    const catalogue = await Catalogue.findAll({ include: { model: Process } })
    return catalogue
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getCatalogue = async (id) => {
  try {
    const catalogue = await Catalogue.findOne({
      where: {
        id,
      },
      include: { model: Process },
    })

    if (!catalogue) {
      throw new ErrorObject('catalogue not found', 400)
    }
    return catalogue
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.postCreateCatalogue = async (body) => {
  try {
    const catalogue = await Catalogue.create(body)
    await catalogue.save()
    return catalogue
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateCatalogue = async (id, body) => {
  try {
    const catalogue = await Catalogue.findByPk(id)
    if (!catalogue) {
      throw new ErrorObject('Catalogue not exist', 400)
    }
    await catalogue.update(body)
    return catalogue
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteCatalogue = async (id) => {
  try {
    const catalogue = await this.getCatalogue(id)
    await catalogue.destroy({ id })
    return catalogue
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
