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

    
      models.user.hasMany(models.review, { onDelete: "cascade" });
        // onDelete 옵션은 테이블간 데이터 삭제 의존관계를 설정하는데 사용됩니다. 현재는 지우시고 공식문서를 통해 공부하신 뒤 사용하세요
      

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
      // this.hasMany(models.review, {
      //   foreignKey: 'user_id',
      //   sourceKey : 'id',
      // });
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