const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'alumni'], default: 'alumni' },
    eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    eventsOrganized: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    timestamp: { type: Date, default: Date.now }, // Add timestamp field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
