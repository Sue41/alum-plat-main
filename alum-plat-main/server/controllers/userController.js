const User = require('../models/userModel');
const Event = require('../models/eventModel');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const newUser = new User({
            username,
            password,
            role: role || 'alumni', // If role is not provided, default to 'alumni'
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords (without hashing)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Create and send a JWT token upon successful login
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });


        res.status(200).json({ token,user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove user reference from events
        await Event.updateMany(
            { participants: { $in: [userId] } },
            { $pull: { participants: userId } }
        );

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create many users
exports.createManyUsers = async (req, res) => {
    const usersData = req.body;

    try {
        const createdUsers = await User.create(usersData);
        res.status(201).json(createdUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};