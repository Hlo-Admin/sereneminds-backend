const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Emotion extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Emotion.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      score: {
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
      modelName: "Emotion",
    }
  );
  return Emotion;
}; 