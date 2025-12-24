const { Model } = require("sequelize");
const Institute = require("./institute");
const Branch = require("./branch");
const School = require("./school");


module.exports = (sequelize, DataTypes) => {
  class City extends Model {
     static associate(models) {
      // Correct place to define associations
      City.hasMany(models.Institute, {
        foreignKey: "cityId",
        as: "institutes"
      });

      City.hasMany(models.Branch, {
        foreignKey: "cityId",
        as: "branches"
      });

      City.hasMany(models.School,{
        foreignKey: "cityId",
        as : "schools"
      });
    
      };
    }

  City.init(
    {
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
