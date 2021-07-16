'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      player: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      jazzbar_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jazzbars',
          key: 'id'
        }
      },
      content: {
        type: Sequelize.INTEGER
      },
      showCharge: {
        type: Sequelize.INTEGER
      },
      currentSeat: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('shows');
  }
};