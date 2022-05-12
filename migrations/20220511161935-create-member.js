'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('member', {
      member_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_member: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      tlp: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('L', 'P')
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
    await queryInterface.dropTable('member');
  }
};