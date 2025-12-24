const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Mood extends Model {
    static associate(models) {
      // Define association with Emotion
      Mood.belongsTo(models.Emotion, {
        foreignKey: "emotionId",
        as: "emotion",
      });
      // Define association with Zone
      Mood.belongsTo(models.Zone, {
        foreignKey: "zoneId",
        as: "zone",
      });
    }
  }
  Mood.init(
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
      emotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Emotions",
          key: "id",
        },
      },
      zoneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Zones",
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
      modelName: "Mood",
    }
  );
  return Mood;
};



