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
        foreignkey : 'userId',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.show, {
        foreignkey : 'showId',
        onDelete: 'CASCADE',
      });
    }
  };
  reservation.init({
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER,
    people: DataTypes.STRING,
    confirm: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};