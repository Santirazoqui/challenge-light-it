const express = require('express');
const router = express.Router();
const userController = require('./UserController');

router.post("/api/register", userController.PostUser);

module.exports = router;