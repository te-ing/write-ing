'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    createdAt: { type: Sequelize.STRING },
    updatedAt: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    subtitle: { type: Sequelize.STRING },
    content: { type: Sequelize.TEXT },
    status: { type: Sequelize.STRING },
    tag: { type: Sequelize.STRING },
    like: { type: Sequelize.JSON },
    comment: { type: Sequelize.JSON },
    },);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};
export default config;