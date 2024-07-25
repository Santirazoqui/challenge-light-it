const express = require('express');
const router = express.Router();
const userController = require('./UserController');

router.post("/api/user", userController.PostUser);

module.exports = router;