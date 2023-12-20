const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create event route
router.post('/create', eventController.createEvent);

// Delete event route
router.delete('/:eventId', eventController.deleteEvent);

// Get all events route
router.get('/', eventController.getAllEvents);

// Update event route
router.put('/:eventId', eventController.updateEvent);

// Get events by user ID route
router.get('/user/:userId', eventController.getEventByUserId);

// View all participants for an event route
router.get('/:eventId/participants', eventController.viewAllParticipants);

// Add participant to event route
router.post('/:eventId/add-participant/:userId', eventController.addParticipantToEvent);

// Remove participant from event route
router.delete('/:eventId/remove-participant/:userId', eventController.removeParticipantFromEvent);

// Cancel event route
router.delete('/:eventId/cancel', eventController.cancelEvent);

module.exports = router;
