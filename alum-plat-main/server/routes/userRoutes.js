const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register user
router.post('/register', userController.registerUser);

//Login user
router.post('/login', userController.loginUser);

// Delete user
router.delete('/:userId', userController.deleteUser);

// Get all users
router.get('/', userController.getAllUsers);

// Create many users
router.post('/create-many', userController.createManyUsers);



module.exports = router;
