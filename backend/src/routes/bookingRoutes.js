import { Router } from 'express';
const router = Router();
import * as bookingController from '../controllers/bookingController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validation.js';
import { createBookingValidation } from '../validators/bookingValidators.js';

router.post('/', auth, createBookingValidation, validate, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getMyBookings);
router.get('/event/:eventId', auth, bookingController.getEventBookings);
router.put('/:id/cancel', auth, bookingController.cancelBooking);

export default router;
