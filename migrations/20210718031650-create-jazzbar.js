'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jazzbars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        onDelete: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barName: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      defaultSeat: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      serviceOption: {
        type: Sequelize.STRING
      },
      openTime: {
        type: Sequelize.STRING
      },
      gpsX: {
        type: Sequelize.STRING
      },
      gpsY: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jazzbars');
  }
};