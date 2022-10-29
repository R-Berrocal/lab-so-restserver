const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const csv = require('csvtojson')
const { ErrorObject } = require('../helpers/error')

exports.getProcessys = async () => {
  try {
    const array = fs.readFileSync('./assets/tasklist.json')
    const respuesta = []
    JSON.parse(array).forEach((element) => {
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
        quantum: element['Nombre de imagen'].length || 0,
      })
    })
    return respuesta
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
    const data = JSON.stringify(jsonArray)
    fs.writeFile('./assets/tasklist.json', data, (err) => {
      if (err) {
        return err
      }
      return 'convertido a json'
    })
    const respuesta = []
    JSON.parse(data).forEach((element) => {
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
        quantum: element['Nombre de imagen'].length || 0,
      })
    })
    return respuesta
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500)
  }
}
