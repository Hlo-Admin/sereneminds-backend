const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AcademicYear extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  AcademicYear.init(
    {
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "AcademicYear",
    }
  );
  return AcademicYear;
};
