const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsTo(models.School, { foreignKey: "schoolId", as: "school" });
    }
  }
  Teacher.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subjects: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      classes: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      schoolId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Schools",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Teacher",
      tableName: "Teachers",
      timestamps: true,
    }
  );
  return Teacher;
};


