'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Process extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Process.belongsTo(models.Catalogue, {
        foreignKey: 'catalogueId'
      })
    }
  }
  Process.init({
    nombreDeImagen: DataTypes.STRING,
    PID: DataTypes.STRING,
    nombreDeSesion: DataTypes.STRING,
    numDeSesion: DataTypes.STRING,
    usoDeMemoria: DataTypes.STRING,
    estado: DataTypes.STRING,
    nombreDeUsuario: DataTypes.STRING,
    tiempoDeCpu: DataTypes.STRING,
    tituloDeVentana: DataTypes.STRING,
    quantum: DataTypes.STRING,
    prioridad: DataTypes.STRING,
    catalogueId: DataTypes.NUMBER 
  }, {
    sequelize,
    modelName: 'Process',
    timestamps: true,
    paranoid: true
  });
  return Process;
};