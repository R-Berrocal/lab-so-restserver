'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Processes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombreDeImagen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PID: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombreDeSesion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numDeSesion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usoDeMemoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombreDeUsuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tiempoDeCpu: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tituloDeVentana: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prioridad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      catalogueId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Catalogues',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Processes');
  }
};