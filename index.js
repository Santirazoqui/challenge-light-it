const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./webApi/userController/Router');
const Sequelize = require('sequelize');
const MySqlDialect = require('@sequelize/mysql');
const errorMiddleware = require('./webApi/middleware/errorMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT must be set in the environment');
}

try {
  app.listen(PORT, () => {
    console.log(`LightIt listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error)
}

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MySQLHOST,
    port: process.env.MySQLPORT,
    username: process.env.MySQLUSER,
    password: process.env.MySQLPASSWORD,
    database: process.env.MySQLDATABASE
  });

async function initSequelize(){
    try{    
      await sequelize.sync();
      console.log("Connected to sequelize.");  
    }
    catch(error){
      console.error("Error connecting to MySQL", error);
    }
}
  
initSequelize();