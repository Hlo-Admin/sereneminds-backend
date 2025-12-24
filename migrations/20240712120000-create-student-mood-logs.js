"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StudentMoodLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      feelingDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Current mood/feeling description",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "SubCategories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      addNote: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Custom note added by student if no predefined subcategory applies",
      },
      impact: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Impact level from 1-7",
      },
      joyfulness: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Joyfulness level from 1-7",
      },
      calculatedEmotion: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Calculated emotion based on impact and joyfulness",
      },
      calculatedZone: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Calculated zone based on impact and joyfulness",
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: "Active/Inactive status",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StudentMoodLogs");
  },
};

