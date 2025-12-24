const { Model } = require("sequelize");
const State = require("./state");
const City = require("./city");
const Institute = require("./institute");

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
      static associate(models) {
        Branch.belongsTo(models.State, { foreignKey: 'stateId', as: 'state' });
        Branch.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' });
        

      }
      // define association here if needed
      // Branch could be associated with Institute in the future
  }
  
  Branch.init(
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
      instituteName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instituteCode: {
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
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
      modelName: "Branch",
    }
  );
  return Branch;
};
