const User = require('../models/userModel');
const Event = require('../models/eventModel');
const bcrypt = require('bcrypt');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if the username already exists
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Create a new user with the provided username and password
            const newUser = new User({
                username,
                password,  // Assign the password directly without hashing (for testing purposes only)
                role: 'alumni', // or 'admin' based on your implementation
            });

            await newUser.save();
            res.status(201).json({ message: 'User registered successfully', newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find the user by username
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Compare the provided password directly (without hashing)
            if (password !== user.password) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // If the username and password are correct, you can set up a session or generate a token for authentication
            // For simplicity, let's assume successful login results in a message
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        try {
            // Implement logic to get user by ID
            const user = await User.findById(req.params.userId);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            // Implement logic to delete user
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            // Implement logic to update user details
            await User.findByIdAndUpdate(req.params.userId, {
                username: req.body.username,
                password: req.body.password,
            });
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            // Implement logic to get all users
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    viewUserDashboard: async (req, res) => {
        try {
            // Implement logic to retrieve and render user dashboard
            const user = await User.findById(req.params.userId).populate('eventsParticipated eventsOrganized');
            res.render('dashboard', { user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    participateInEvent: async (req, res) => {
        try {
            // Implement logic to add event to eventsParticipated array for the user
            const user = await User.findById(req.params.userId);
            user.eventsParticipated.push(req.params.eventId);
            await user.save();
            res.status(200).json({ message: 'User participated in the event successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    viewParticipatedEvents: async (req, res) => {
        try {
            // Implement logic to retrieve and render events participated by the user
            const user = await User.findById(req.params.userId).populate('eventsParticipated');
            res.render('participated-events', { events: user.eventsParticipated });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    organizeEvent: async (req, res) => {
        try {
            // Implement logic to add event to eventsOrganized array for the user
            const user = await User.findById(req.params.userId);
            user.eventsOrganized.push(req.params.eventId);
            await user.save();
            res.status(200).json({ message: 'User organized the event successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    viewOrganizedEvents: async (req, res) => {
        try {
            // Implement logic to retrieve and render events organized by the user
            const user = await User.findById(req.params.userId).populate('eventsOrganized');
            res.render('organized-events', { events: user.eventsOrganized });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = userController;
