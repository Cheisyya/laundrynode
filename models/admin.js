'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
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
      this.hasMany(models.transaksi, {
        foreignKey: "admin_id",
        as: "transaksi"
      })
    }
  }
  admin.init({
    admin_id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    outlet_id: {
      type: DataTypes.INTEGER,
      allowNull: false  // data customer harus diisi dulu
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'kasir','owner')
  }, {
    sequelize,
    modelName: 'admin',
    tableName: 'admin'
  });
  return admin;
};