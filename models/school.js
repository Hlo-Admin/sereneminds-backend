const { Model } = require("sequelize");
const State = require("./state");
const City = require("./city");
const Branch = require("./branch");

module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    static associate(models) {
      // define association here if needed
      // School could be associated with Institute and Branch in the future
        School.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
        School.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
    }
  }
  School.init(
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
      instituteName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instituteCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      branchName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      branchCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address2: {
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
      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schoolType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
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
      modelName: "School",
    }
  );
  return School;
};
