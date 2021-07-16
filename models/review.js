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

      // models.review.belongsTo(models.user, { foreignKey: "user_id" });
      // foreignKey 옵션은 외래키를 가지는 직접적인 컬럼을 의미합니다.
  
    
      models.review.belongsTo(models.board, {
        foreignkey : 'board_id',
        // targetKey : 'id',
      });
      models.review.belongsTo(models.jazzbar, {
        foreignkey : 'jazzbar_id',
        // targetKey : 'id',
      });
      models.review.belongsTo(models.user, {
        foreignkey : 'user_id',
        // targetKey : 'id',
      });
    }
  };
  review.init({
    board_id: DataTypes.INTEGER,
    jazzbar_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    point: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};