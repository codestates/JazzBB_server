'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('menus', [{
    jazzbarId: 1,
    name: null,
    thumbnail: 'https://placeimg.com/64/64/3,https://placeimg.com/64/64/2,https://placeimg.com/64/64/1',
    price: null,
    kind: null,
    content: null,
    createdAt : new Date(),
    updatedAt : new Date(), 
   }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jazzbars');
  }
};
