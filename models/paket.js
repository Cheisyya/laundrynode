'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.detail_transaksi,{
        foreignKey: "paket_id",
        as: "detail transaksi paket"
      })
    }
  }
  paket.init({
    paket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    jenis: DataTypes.STRING,
    satuan: DataTypes.ENUM('kg', 'pcs'),
    harga: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'paket',
    tableName: "paket"
  });
  return paket;
};