const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SchoolUser extends Model {
    static associate(models) {
      // SchoolUser belongs to a School
      SchoolUser.belongsTo(models.School, { foreignKey: "schoolId", as: "school" });
    }
  }
  SchoolUser.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("school_admin", "school_staff", "school_teacher"),
        defaultValue: "school_admin",
      },
      schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Schools",
          key: "id",
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "SchoolUser",
      tableName: "SchoolUsers",
      timestamps: true,
    }
  );
  return SchoolUser;
};



