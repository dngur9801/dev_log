const dbConfig = require('../config/config.json')['development'];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
