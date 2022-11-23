module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      teamName: Sequelize.INTEGER
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams')
  }
}