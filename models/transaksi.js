'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.outlet, {
        foreignKey: "outlet_id",
        as: "outlet"
      })
      this.belongsTo(models.member, {
        foreignKey: "member_id",
        as: "member"
      })
      this.hasMany(models.detail_transaksi, {
        foreignKey: "transaksi_id",
        as: "detail_transaksi"
      })
      this.belongsTo(models.admin, {
        foreignKey: "admin_id",
        as: "admin"
      })
    }
  }
  transaksi.init({
    transaksi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // data customer harus diisi dulu
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // data customer harus diisi dulu
    },
    outlet_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // data customer harus diisi dulu
    },
    tgl: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    status: DataTypes.ENUM('baru', 'proses','selesai','diambil'),
    dibayar: DataTypes.ENUM('dibayar', 'belum_dibayar')
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};