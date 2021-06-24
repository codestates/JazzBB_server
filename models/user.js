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
      this.belongsTo(models.jazzbar, {
        foreignkey : 'jazzbar_id',
        targetKey : 'id',
      });
      this.hasMany(models.reservation, {
        foreignKey: 'user_id',
        sourceKey : 'id',
      });
      this.hasMany(models.board, {
        foreignKey: 'user_id',
        sourceKey : 'id',
      });
      this.hasMany(models.review, {
        foreignKey: 'user_id',
        sourceKey : 'id',
      });
      this.hasMany(models.subscribe, {
        foreignKey: 'user_id',
        sourceKey : 'id',
      });
    }
  };
  user.init({
    userId: DataTypes.STRING,
    username: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    usertype: DataTypes.STRING,
    mobile: DataTypes.STRING,
    jazzbar_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};