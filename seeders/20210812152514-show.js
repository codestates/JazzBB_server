'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('shows', [{
    time: '20:00-21:00',
    date: '2021-08-20',
    player: '{"guitar":"김기타","time":"박상욱","drum":"진성욱","trumpet":"박소여"}',
    thumbnail: 'https://placeimg.com/64/64/1',
    jazzbarId: '1',
    content: '한여름밤 시원한 재즈바 1탄!',
    showCharge: '10000',
    currentSeat : '20',
    createdAt : new Date(),
    updatedAt : new Date(), 
  },{
    time: '20:00-21:00',
    date: '2021-08-21',
    player: '{"guitar":"김기타","time":"박상욱","drum":"진성욱","trumpet":"박소여"}',
    thumbnail: 'https://placeimg.com/64/64/2',
    jazzbarId: '1',
    content: '한여름밤 시원한 재즈바 2탄!',
    showCharge: '10000',
    currentSeat : '20',
    createdAt : new Date(),
    updatedAt : new Date(), 
  },{
    time: '20:00-21:00',
    date: '2021-08-27',
    player: '{"guitar":"김기타","time":"박상욱","drum":"진성욱","trumpet":"박소여"}',
    thumbnail: 'https://placeimg.com/64/64/3',
    jazzbarId: '1',
    content: '한여름밤 시원한 재즈바 3탄!',
    showCharge: '10000',
    currentSeat : '20',
    createdAt : new Date(),
    updatedAt : new Date(), 
   }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jazzbars');
  }
};
