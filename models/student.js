const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // Student can belong to a Class and Division
      Student.belongsTo(models.ClassData, { foreignKey: "classId", as: "class" });
      Student.belongsTo(models.Division, { foreignKey: "divisionId", as: "division" });
      Student.belongsTo(models.School, { foreignKey: "schoolId", as: "school" });
    }
  }
  Student.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
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
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      parentName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Classes",
          key: "id",
        },
      },
      divisionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Divisions",
          key: "id",
        },
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
      modelName: "Student",
      tableName: "Students",
      timestamps: true,
    }
  );
  return Student;
};


