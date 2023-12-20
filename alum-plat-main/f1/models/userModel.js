const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['admin', 'alumni'] },
    eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    eventsOrganized: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
