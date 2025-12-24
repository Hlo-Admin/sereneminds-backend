const { Model } = require("sequelize");
const State = require("./state");
const City = require("./city");
const Branch = require("./branch");




module.exports = (sequelize, DataTypes) => {
  class Institute extends Model {
    // ...existing code...
      static associate(models) {
        Institute.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
        Institute.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });

      }
  }
  Institute.init(
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
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'States', 
          key: 'id'
        }
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities', 
          key: 'id'
        }
      },
      pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephoneNumber: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Institute",
    }
  );
  return Institute;
};
