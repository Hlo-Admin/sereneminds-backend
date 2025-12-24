const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Zone extends Model {
    static associate(models) {
      // Define association with Emotion
      Zone.belongsTo(models.Emotion, {
        foreignKey: "emotionId",
        as: "emotion",
      });
    }
  }
  Zone.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      emotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Emotions",
          key: "id",
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Zone",
    }
  );
  return Zone;
};
