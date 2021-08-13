'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('reservations',[{
    userId: 2,
    showId: 1,
    people: 2,
    confirm: 'pending',
    createdAt : new Date(),
    updatedAt : new Date(), 
   },{
    userId: 2,
    showId: 2,
    people: 4,
    confirm: 'confirm',
    createdAt : new Date(),
    updatedAt : new Date(), 
   },{
    userId: 2,
    showId: 3,
    people: 2,
    confirm: 'pending',
    createdAt : new Date(),
    updatedAt : new Date(), 
   }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reservations');
  }
};
