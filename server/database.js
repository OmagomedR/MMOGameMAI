// server/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'game_data.db',
    logging: false
});
module.exports = sequelize;