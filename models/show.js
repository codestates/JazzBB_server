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
        foreignkey : 'jazzbarId',
        onDelete: 'cascade',
      });
      this.hasMany(models.reservation, {
        foreignKey: 'showId',
        onDelete: "cascade"
      });
    }
  };
  show.init({
    time: DataTypes.STRING,
    date: DataTypes.STRING,
    player: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    jazzbarId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    showCharge: DataTypes.STRING,
    currentSeat : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'show',
  });
  return show;
};