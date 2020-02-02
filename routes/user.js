const express = require('express');
var verifyToken = require('../middleware/verifyToken');
const adminRole=require('../middleware/auth');

const userController = require('../controller/user');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login',userController.login);

/**
 * This is used to get all the users 
 * ( Added middleware for verifying token i.e verifyToken )
 */
router.get('/all', adminRole, userController.getAllUsers);

module.exports = router;