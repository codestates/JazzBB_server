'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      userId: '1236776981',
      userEmail: 'testId1@gmail.com',
      username: '김멀터',
      thumbnail: 'https://placeimg.com/64/64/1',
      usertype: 'boss',
      mobile: '01012123434',
      jazzbarId: 1,
      createdAt : new Date(),
      updatedAt : new Date(), 
    },{
      userId: '1236776982',
      userEmail: 'testId2@gmail.com',
      username: '김손님',
      thumbnail: 'https://placeimg.com/64/64/2',
      usertype: 'customer',
      mobile: '01023231234',
      jazzbarId: null,
      createdAt : new Date(),
      updatedAt : new Date(), 
    }
  ])

  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.dropTable('users');
  }
};
