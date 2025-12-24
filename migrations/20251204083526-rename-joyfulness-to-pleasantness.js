'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename column from joyfulness to pleasantness
    await queryInterface.renameColumn(
      'StudentMoodLogs',
      'joyfulness',
      'pleasantness'
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert: rename column back from pleasantness to joyfulness
    await queryInterface.renameColumn(
      'StudentMoodLogs',
      'pleasantness',
      'joyfulness'
    );
  }
};
