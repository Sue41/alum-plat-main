const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    category: { type: String, enum: ['professional development', 'networking', 'campus events'] },
    location: String,
    timestamp: { type: Date, default: Date.now },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
