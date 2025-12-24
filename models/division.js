const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    static associate(models) {
      // define association here if needed
      // Division could be associated with Class and School in the future
    }
  }
  Division.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classCode: {
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
      modelName: "Division",
    }
  );
  return Division;
};
