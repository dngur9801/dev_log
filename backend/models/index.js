const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/config')[env];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectModule: env === 'production' ? 'mariadb' : 'mysql',
    operatorsAliases: false,
    timezone: '+09:00',
    port: env === 'production' ? '31571' : '3306',
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
