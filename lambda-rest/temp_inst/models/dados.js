'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  dados.init({
	hora: DataTypes.INTEGER,
	dc_nome: DataTypes.STRING,
	cd_estacao: DataTypes.STRING,
	vl_latitude: DataTypes.DECIMAL(10,2),
	vl_longitude: DataTypes.DECIMAL(10,2),
    radiacao: DataTypes.STRING,
    temp_inst: DataTypes.STRING,
    umidade_relativa_max: DataTypes.STRING,
    temp_min: DataTypes.STRING,
    temp_max: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dados',
  });
  return dados;
};