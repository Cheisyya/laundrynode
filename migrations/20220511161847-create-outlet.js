'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('outlet', {
      outlet_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_outlet: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      tlp: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('outlet');
  }
};