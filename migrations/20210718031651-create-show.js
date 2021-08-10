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
      jazzbarId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'jazzbars',
          key: 'id'
        }
      },
      content: {
        type: Sequelize.STRING
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