module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      team_name: Sequelize.STRING
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams')
  }
}