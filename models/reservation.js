'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignkey : 'user_id',
        targetKey : 'id',
        as : 'user'
      });
      this.belongsTo(models.show, {
        foreignkey : 'show_id',
        targetKey : 'id',
        as : 'show'
      });
    }
  };
  reservation.init({
    user_id: DataTypes.INTEGER,
    show_id: DataTypes.INTEGER,
    people: DataTypes.STRING,
    confirm: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};