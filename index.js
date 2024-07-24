const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./webApi/userController/Router');

dotenv.config();

const app = express();
app.use(express.json());

app.use(userRouter);


const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT must be set in the environment');
}

try {
  app.listen(PORT, () => {
    console.log(`Inmo 2 listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error)
}