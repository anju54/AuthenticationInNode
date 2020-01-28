const express = require('express');
var verifyToken = require('../middleware/verifyToken');

const userController = require('../controller/user');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login',userController.login);

// Added middleware for verifying token
router.get('/all', verifyToken, userController.getAllUsers);

module.exports = router;