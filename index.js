const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./webApi/userController/Router');
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
    console.log(`Inmo 2 listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error)
}