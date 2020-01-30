const express = require('express');
var verifyToken = require('../middleware/verifyToken');

const userController = require('../controller/user');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login',userController.login);

/**
 * This is used to get all the users 
 * ( Added middleware for verifying token i.e verifyToken )
 */
router.get('/all', verifyToken, userController.getAllUsers);

module.exports = router;