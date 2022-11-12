const fs = require('fs')
const { ErrorObject } = require('../helpers/error')
const { Process, Catalogue } = require('../database/models')

exports.getProcesses = async () => {
  try {
    const process = await Process.findAll({ include: { model: Catalogue } })
    return process
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.getProcess = async (id) => {
  try {
    const process = await Process.findOne({
      where: {
        id,
      },
      include: { model: Catalogue },
    })

    if (!process) {
      throw new ErrorObject('Process not found', 400)
    }
    return process
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.postCreateProcess = async (id, body) => {
  try {
    const processes = []
    await Promise.all(
      body.map(
        async ({
          nombreDeImagen,
          PID,
          nombreDeSesion,
          numDeSesion,
          usoDeMemoria,
          estado,
          nombreDeUsuario,
          tiempoDeCpu,
          tituloDeVentana,
          quantum,
          prioridad,
        }) => {
          const data = await Process.create({
            nombreDeImagen,
            PID,
            nombreDeSesion,
            numDeSesion,
            usoDeMemoria,
            estado,
            nombreDeUsuario,
            tiempoDeCpu,
            tituloDeVentana,
            quantum,
            prioridad,
            catalogueId: id,
          })
          fs.writeFile(`./assets/processFiles/${nombreDeImagen}.txt`, nombreDeImagen, (err) => {
            if (err) {
              return err
            }
            return 'file created'
          })
          processes.push(data)
        },
      ),
    )
    const data = processes.map((value) => value.dataValues)
    return data
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.updateProcess = async (id, body) => {
  try {
    const process = await Process.findOne({
      where: {
        id,
      },
      include: { model: Catalogue },
    })
    if (!process) {
      throw new ErrorObject('Process not exist', 400)
    }
    await process.update(body)
    return process
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}

exports.deleteProcess = async (id) => {
  try {
    const process = await this.getProcess(id)
    await process.destroy({ id })
    return process
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
