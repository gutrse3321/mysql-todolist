/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    ID: {
      // 字段类型
      type: DataTypes.INTEGER(11),
      // 是否为空
      allowNull: false,
      // 主键
      primaryKey: true,
      // 自增
      autoIncrement: true
    },
    UserName: {
      // 最大长度
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    Password: {
      type: DataTypes.CHAR(128),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
