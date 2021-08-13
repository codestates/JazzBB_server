'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.jazzbar, {
        foreignkey : 'jazzbarId',
        onDelete: 'CASCADE',
      });
    }
  };
  menu.init({
    jazzbarId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    price: DataTypes.STRING,
    kind: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};