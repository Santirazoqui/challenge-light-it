const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MySQLHOST,
    port: process.env.MySQLPORT,
    username: process.env.MySQLUSER,
    password: process.env.MySQLPASSWORD,
    database: process.env.MySQLDATABASE
  });

module.exports = sequelize;