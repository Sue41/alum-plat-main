const Event = require('../models/eventModel');
const User = require('../models/userModel');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        // Format date for each event
        const formattedEvents = events.map(event => ({
            ...event._doc,
            date: event.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
        }));

        res.status(200).json(formattedEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Create event
exports.createEvent = async (req, res) => {
    const { title, date, category, location ,organizer } = req.body;

    try {
        const newEvent = new Event({
            title,
            date,
            category,
            location,
            organizer
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get events by user ID
exports.getEventsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const events = await Event.find({ organizer: userId });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Delete event
exports.deleteEvent = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Remove event reference from users who participated
        await User.updateMany(
            { _id: { $in: deletedEvent.participants } },
            { $pull: { eventsParticipated: eventId } }
        );

        res.status(200).json(deletedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const { title, date, category, location } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { title, date, category, location },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all events the user is not a participant
exports.getEventsUserNotParticipated = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const eventsNotParticipated = await Event.find({ participants: { $nin: [userId] } });
        res.status(200).json(eventsNotParticipated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Create many events
exports.createManyEvents = async (req, res) => {
    const eventsData = req.body;

    try {
        const createdEvents = await Event.create(eventsData);
        res.status(201).json(createdEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get events by category
exports.getEventsByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        const events = await Event.find({ category });
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a user as a participant to an event
exports.addParticipantToEvent = async (req, res) => {
    const { eventId, userId } = req.params;

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the user to the participants array of the event
        event.participants.push(user._id);
        await event.save();

        // Add the event to the eventsParticipated array of the user
        user.eventsParticipated.push(event._id);
        await user.save();

        res.status(200).json({ message: 'User added as a participant to the event successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};