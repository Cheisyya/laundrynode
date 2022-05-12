'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.transaksi,{
        foreignKey: "member_id",
        as: "transaksi member"
      })
    }
  }
  member.init({
    member_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name_member: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tlp: DataTypes.STRING,
    jenis_kelamin: DataTypes.ENUM('L', 'P')
  }, {
    sequelize,
    modelName: 'member',
    tableName: 'member'
  });
  member.associate = (models) => {
    member.belongsToMany(models.transaksi,{through:"MemberTransaction", foreignKey: 'member_id', as: 'transaksi'})
  }
  return member;
};