'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscribe extends Model {
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
      this.belongsTo(models.user, {
        foreignkey : 'user_id',
        targetKey : 'id',
      })
    }
  };
  subscribe.init({
    user_id: DataTypes.INTEGER,
    jazzbar_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subscribe',
  });
  return subscribe;
};