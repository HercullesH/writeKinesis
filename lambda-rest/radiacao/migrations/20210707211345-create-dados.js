'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	  hora: {
        type: Sequelize.INTEGER
      },
      dc_nome: {
        type: Sequelize.STRING
      },
	  cd_estacao: {
        type: Sequelize.STRING
      },
	  vl_latitude: {
        type: Sequelize.DECIMAL(10,6)
      },
	  vl_longitude: {
        type: Sequelize.DECIMAL(10,6)
      },
	  radiacao: {
        type: Sequelize.DECIMAL(10,6)
      },
      temp_inst: {
        type: Sequelize.STRING
      },
      umidade_relativa_max: {
        type: Sequelize.STRING
      },
      temp_min: {
        type: Sequelize.STRING
      },
      temp_max: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dados');
  }
};