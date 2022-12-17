const dotenv = require('dotenv');
dotenv.config();
console.log('process.env.API_ADDRESS : ', process.env.API_ADDRESS);
module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'devlog',
    // host: '127.0.0.1',
    host: process.env.API_ADDRESS,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'devlog',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
