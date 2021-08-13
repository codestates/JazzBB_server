'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.reservation, {
        onDelete: "cascade"
      });
      this.hasMany(models.board, {
        onDelete: "cascade"
      });
      this.hasMany(models.review, {
        onDelete: "cascade"
      });
    }
  };
  user.init({
    userId: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    username: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    usertype: DataTypes.STRING,
    mobile: DataTypes.STRING,
    jazzbarId: DataTypes.INTEGER, 
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};