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
        onDelete: "cascade"
      });
      this.hasMany(models.review, {
        onDelete: "cascade"
      });
      this.hasMany(models.show, {
        onDelete: "cascade"
      });
    }
  };
  jazzbar.init({
    barName: DataTypes.STRING,
    mobile: DataTypes.STRING,
    defaultSeat: DataTypes.STRING,
    area: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    address: DataTypes.STRING,
    rating: DataTypes.STRING,
    serviceOption: DataTypes.STRING,
    openTime: DataTypes.STRING,
    gpsX: DataTypes.STRING,
    gpsY: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'jazzbar',
  });
  return jazzbar;
};