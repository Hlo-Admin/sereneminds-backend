const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StudentMoodLog extends Model {
    static associate(models) {
      // Association with User (student)
      StudentMoodLog.belongsTo(models.User, {
        foreignKey: "studentId",
        as: "student",
      });
      
      // Association with Category
      StudentMoodLog.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      
      // Association with SubCategory
      StudentMoodLog.belongsTo(models.SubCategory, {
        foreignKey: "subCategoryId",
        as: "subCategory",
      });
    }
  }
  
  StudentMoodLog.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      feelingDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Current mood/feeling description",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "SubCategories",
          key: "id",
        },
      },
      addNote: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Custom note added by student if no predefined subcategory applies",
      },
      impact: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        comment: "Impact level from 1-7",
      },
      joyfulness: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7,
        },
        comment: "Joyfulness/Pleasantness level from 1-7",
      },
      calculatedEmotion: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Calculated emotion based on impact and joyfulness",
      },
      calculatedZone: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Calculated zone based on impact and joyfulness",
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Active/Inactive status",
      },
    },
    {
      sequelize,
      modelName: "StudentMoodLog",
      tableName: "StudentMoodLogs",
      timestamps: true,
    }
  );
  
  return StudentMoodLog;
};

