'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jazzbar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.menu, {
        foreignKey: 'jazzbar_id',
        sourceKey : 'id',
      });
      this.hasMany(models.review, {
        foreignKey: 'jazzbar_id',
        sourceKey : 'id',
      });
      this.hasMany(models.subscribe, {
        foreignKey: 'jazzbar_id',
        sourceKey : 'id',
      });
      this.hasMany(models.user, {
        foreignKey: 'jazzbar_id',
        sourceKey : 'id',
      });
      this.hasMany(models.show, {
        foreignKey: 'jazzbar_id',
        sourceKey : 'id',
      });
    }
  };
  jazzbar.init({
    barName: DataTypes.STRING,
    mobile: DataTypes.STRING,
    defaultSeat: DataTypes.STRING,
    area: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    gpsX: DataTypes.STRING,
    gpsY: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jazzbar',
  });
  return jazzbar;
};