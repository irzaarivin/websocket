const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  port: config.development.port,
  logging: config.environment === 'development' ? console.log : false,
});

module.exports = { sequelize, Sequelize };
