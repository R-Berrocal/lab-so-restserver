const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const csv = require('csvtojson')
const { ErrorObject } = require('../helpers/error')

exports.getProcessys = async () => {
  try {
    const array = fs.readFileSync('./assets/tasklist.json')
    return JSON.parse(array)
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
exports.postCreateProcessys = async () => {
  try {
    const { stderr } = await exec('tasklist /v /fo csv> ./assets/tasklist.csv')
    if (stderr) {
      return stderr
    }
    const jsonArray = await csv().fromFile('./assets/tasklist.csv')
    const respuesta = []
    jsonArray.forEach((element) => {
      respuesta.push({
        nombreDeImagen: element['Nombre de imagen'],
        PID: element.PID,
        nombreDeSesion: element['Nombre de sesi�n'],
        numDeSesion: element['N�m'][' de sesi�n'],
        usoDeMemoria: element['Uso de memoria'],
        estado: element.Estado,
        nombreDeUsuario: element['Nombre de usuario'],
        tiempoDeCpu: element['Tiempo de CPU'],
        tituloDeVentana: element['T�tulo de ventana'],
        quantum: Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1) + 1) + 1),
        prioridad: element['Nombre de imagen'].toUpperCase().includes('SYSTEM') ? 1 : 0,
      })
    })
    fs.writeFile('./assets/tasklist.json', JSON.stringify(respuesta), (err) => {
      if (err) {
        return err
      }
      return 'convertido a json'
    })
    return respuesta
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
