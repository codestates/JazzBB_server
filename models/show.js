'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.jazzbar, {
        foreignkey : 'jazzbar_id',
        targetKey : 'id',
      });
      this.hasMany(models.reservation, {
        foreignKey: 'show_id',
        sourceKey : 'id',
      });
    }
  };
  show.init({
    time: DataTypes.STRING,
    date: DataTypes.STRING,
    player: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    jazzbar_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    showCharge: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'show',
  });
  return show;
};