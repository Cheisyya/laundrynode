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
      this.belongsTo(models.outlet, {
        foreignKey: "outlet_id",
        as: "outlet"
      })
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
    outlet_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // data customer harus diisi dulu
    },
    jenis: DataTypes.STRING,
    satuan: DataTypes.ENUM('kg', 'pcs'),
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paket',
    tableName: "paket"
  });
  return paket;
};