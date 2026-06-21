const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const { createBookingValidation } = require('../validators/bookingValidators');

router.post('/', auth, createBookingValidation, validate, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getMyBookings);
router.get('/event/:eventId', auth, bookingController.getEventBookings);
router.put('/:id/cancel', auth, bookingController.cancelBooking);

module.exports = router;
