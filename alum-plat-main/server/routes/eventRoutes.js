const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events
router.get('/', eventController.getAllEvents);

// Create event
router.post('/', eventController.createEvent);

// Get events by user ID
router.get('/user/:userId', eventController.getEventsByUserId);

// Delete event
router.delete('/:eventId', eventController.deleteEvent);

// Update event
router.put('/:eventId', eventController.updateEvent);

// Create many events
router.post('/create-many', eventController.createManyEvents);


// Get all events the user is not a participant
router.get('/user/:userId/not-participated', eventController.getEventsUserNotParticipated);

// Get events by category
router.get('/category/:category', eventController.getEventsByCategory);

// Route to add a user as a participant to an event
router.post('/events/:eventId/participants/:userId', eventController.addParticipantToEvent);



module.exports = router;
