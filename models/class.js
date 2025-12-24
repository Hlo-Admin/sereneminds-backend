const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ClassData extends Model {
    static associate(models) {
      // define association here if needed
      // ClassData could be associated with School in the future
    }
  }
  ClassData.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      schoolCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "ClassData",
      tableName: "Classes",
    }
  );
  return ClassData;
};
