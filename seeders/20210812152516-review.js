'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('reviews',[{
    boardId: null,
    jazzbarId: 1,
    userId: 2,
    point: '5',
    content: '너무너무 좋아요 ~~!! 강추 합니다~!!!',
    createdAt : new Date(),
    updatedAt : new Date(), 
   }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reviews');
  }
};
