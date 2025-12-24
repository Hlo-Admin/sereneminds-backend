const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pleasantness extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Pleasantness.init(
    {
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Pleasantness",
    }
  );
  return Pleasantness;
}; 