const { Model } = require("sequelize");
const Institute = require("./institute");
const City = require("./city");
const Branch = require("./branch");


module.exports = (sequelize, DataTypes) => {
  class State extends Model {
     static associate(models) {

    State.hasMany(models.Institute, { foreignKey: "stateId", as: "institutes" });
    State.hasMany(models.Branch, { foreignKey: "stateId", as: "branches" });
    State.hasMany(models.School, {foreignKey: "stateId", as: "schools"});


     }
  }
  State.init(
    {
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "State",
    }
  );
  return State;
};
