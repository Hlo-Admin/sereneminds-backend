const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Impact extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Impact.init(
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
      modelName: "Impact",
    }
  );
  return Impact;
};
