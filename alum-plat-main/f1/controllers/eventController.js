const Event = require('../models/eventModel');
const User = require('../models/userModel');

const eventController = {
    createEvent: async (req, res) => {
        try {
            // Implement logic to create a new event
            const newEvent = new Event({
                title: req.body.title,
                date: req.body.date,
                category: req.body.category,
                location: req.body.location,
            });

            await newEvent.save();
            res.status(201).json({ message: 'Event created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            // Implement logic to delete an event
            await Event.findByIdAndDelete(req.params.eventId);
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            // Implement logic to get all events
            const events = await Event.find();
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateEvent: async (req, res) => {
        try {
            // Implement logic to update event details
            await Event.findByIdAndUpdate(req.params.eventId, {
                title: req.body.title,
                date: req.body.date,
                category: req.body.category,
                location: req.body.location,
            });
            res.status(200).json({ message: 'Event updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getEventByUserId: async (req, res) => {
        try {
            // Implement logic to get events associated with a specific user
            const events = await Event.find({ participants: req.params.userId });
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    viewAllParticipants: async (req, res) => {
        try {
            // Implement logic to retrieve and render all participants for an event
            const event = await Event.findById(req.params.eventId).populate('participants');
            res.render('participants', { participants: event.participants });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addParticipantToEvent: async (req, res) => {
        try {
            // Implement logic to add a participant to an event
            const event = await Event.findById(req.params.eventId);
            event.participants.push(req.params.userId);
            await event.save();
            res.status(200).json({ message: 'Participant added to the event successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    removeParticipantFromEvent: async (req, res) => {
        try {
            // Implement logic to remove a participant from an event
            const event = await Event.findById(req.params.eventId);
            event.participants.pull(req.params.userId);
            await event.save();
            res.status(200).json({ message: 'Participant removed from the event successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    cancelEvent: async (req, res) => {
        try {
            // Implement logic to cancel an event
            await Event.findByIdAndDelete(req.params.eventId);
            res.status(200).json({ message: 'Event canceled successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = eventController;
