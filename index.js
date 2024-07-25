const express = require('express');
require('express-async-errors');
const dotenv = require('dotenv');
const userRouter = require('./webApi/userController/Router');
const sequelize = require('./sequelize');
const errorMiddleware = require('./webApi/middleware/errorMiddleware');

dotenv.config();

const app = express();
app.use(express.json({ limit: '5mb' }));

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

async function initSequelize(){
    try{    
      await sequelize.sync();
      console.log("Connected to MySQL.");  
    }
    catch(error){
      console.error("Error connecting to MySQL", error);
    }
}
  
initSequelize();