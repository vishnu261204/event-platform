const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/roles');
const validate = require('../middleware/validation');
const { uploadEventBanner } = require('../middleware/upload');
const {
  createEventValidation,
  updateEventValidation,
} = require('../validators/eventValidators');

router.get('/', eventController.getAllEvents);
router.get('/my-events', auth, authorize('organizer', 'admin'), eventController.getMyEvents);
router.get('/:id', eventController.getEventById);
router.post('/', auth, authorize('organizer', 'admin'), uploadEventBanner, createEventValidation, validate, eventController.createEvent);
router.put('/:id', auth, authorize('organizer', 'admin'), uploadEventBanner, updateEventValidation, validate, eventController.updateEvent);
router.delete('/:id', auth, authorize('organizer', 'admin'), eventController.deleteEvent);

module.exports = router;
