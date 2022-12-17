const dbConfig = require('../config/config')['development'];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    timezone: '+09:00',
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
