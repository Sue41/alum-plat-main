const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Get user by ID route
router.get('/:userId', userController.getUserById);

// Delete user route
router.delete('/:userId', userController.deleteUser);

// Update user details route
router.put('/:userId', userController.updateUser);

// Get all users route
router.get('/', userController.getAllUsers);

// User dashboard route
router.get('/:userId/dashboard', userController.viewUserDashboard);

// Participate in event route
router.post('/:userId/participate/:eventId', userController.participateInEvent);

// View participated events route
router.get('/:userId/participated-events', userController.viewParticipatedEvents);

// Organize event route
router.post('/:userId/organize-event/:eventId', userController.organizeEvent);

// View organized events route
router.get('/:userId/organized-events', userController.viewOrganizedEvents);

module.exports = router;
