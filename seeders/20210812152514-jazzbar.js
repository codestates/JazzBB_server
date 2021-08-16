'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('jazzbars', [{
      barName: '김멀터의 멀터한 재즈바',
      mobile: '01012344321',
      defaultSeat: '20',
      area: '서울 강남구',
      thumbnail: 'https://placeimg.com/64/64/3',
      address: '서울 강남구 어디로 1 (갈까요) 세상은 요지경동 지하 1층',
      rating: null,
      serviceOption: '45',
      openTime: '18:30-24:00',
      gpsX: '127.126',
      gpsY: '37.370',
      createdAt : new Date(),
      updatedAt : new Date(), 
    },{
      barName: '완전 짱짱 째즈바',
      mobile: '01012345678',
      defaultSeat: '18',
      area: '광주 광산구',
      thumbnail: 'https://placeimg.com/64/64/4',
      address: '광주 광산구 2순환로 2474 (신가동) 여기가 어디지 지하 1층',
      rating: null,
      serviceOption: '3456',
      openTime: '18:30-24:00',
      gpsX: '127.126',
      gpsY: '37.370',
      createdAt : new Date(),
      updatedAt : new Date(), 
    },{
      barName: '누가 만들라고 해서 만든 재즈바',
      mobile: '01012344255',
      defaultSeat: '15',
      area: '부산 강서구',
      thumbnail: 'https://placeimg.com/64/64/4',
      address: '부산 강서구 가달 14로 지하 1층',
      rating: null,
      serviceOption: '356',
      openTime: '18:30-24:00',
      gpsX: '127.126',
      gpsY: '37.370',
      createdAt : new Date(),
      updatedAt : new Date(), 
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jazzbars');
  }
};
