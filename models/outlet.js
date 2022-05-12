'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.admin, {
        foreignKey: "outlet_id",
        as: "admin"
      })
      this.hasMany(models.paket, {
        foreignKey: "outlet_id",
        as: "paket"
      })
      this.hasMany(models.transaksi, {
        foreignKey: "outlet_id",
        as: "transaksi"
      })
    }
  }
  outlet.init({
    outlet_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_outlet: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
  
};