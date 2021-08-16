'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.jazzbar, {
        foreignkey : 'jazzbarId',
        onDelete: 'cascade',
      });
      this.belongsTo(models.user, {
        foreignkey : 'userId',
        onDelete: 'cascade',
      });
    }
  };
  review.init({
    boardId: DataTypes.INTEGER,
    jazzbarId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    point: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};