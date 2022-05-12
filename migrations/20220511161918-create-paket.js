'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paket', {
      paket_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      outlet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "outlet",
          key: "outlet_id"
        }
      },
      jenis: {
        type: Sequelize.STRING
      },
      satuan: {
        type: Sequelize.ENUM('kg', 'pcs')
      },
      harga: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('paket');
  }
};