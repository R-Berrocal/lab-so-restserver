'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Catalogue.hasMany(models.Process, {
        foreignKey: 'catalogueId'
      })
    }
  }
  Catalogue.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Catalogue',
    timestamps: true,
    paranoid: true
  });
  return Catalogue;
};