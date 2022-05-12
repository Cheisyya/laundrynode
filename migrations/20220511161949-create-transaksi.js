'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      transaksi_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "member",
          key: "member_id"
        }
      },
      outlet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "outlet",
          key: "outlet_id"
        }
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "admin",
          key: "admin_id"
        }
      },
      tgl: {
        type: Sequelize.DATE
      },
      batas_waktu: {
        type: Sequelize.DATE
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('baru', 'proses','selesai','diambil')
      },
      dibayar: {
        type: Sequelize.ENUM('dibayar', 'belum_dibayar')
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
    await queryInterface.dropTable('transaksi');
  }
};