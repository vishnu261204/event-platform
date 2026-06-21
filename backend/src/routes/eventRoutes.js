import { Router } from 'express';
const router = Router();
import * as eventController from '../controllers/eventController.js';
import auth from '../middleware/auth.js';
import authorize from '../middleware/roles.js';
import validate from '../middleware/validation.js';
import { uploadEventBanner } from '../middleware/upload.js';
import {
  createEventValidation,
  updateEventValidation,
} from '../validators/eventValidators.js';

router.get('/', eventController.getAllEvents);
router.get('/my-events', auth, authorize('organizer', 'admin'), eventController.getMyEvents);
router.get('/:id', eventController.getEventById);
router.post('/', auth, authorize('organizer', 'admin'), uploadEventBanner, createEventValidation, validate, eventController.createEvent);
router.put('/:id', auth, authorize('organizer', 'admin'), uploadEventBanner, updateEventValidation, validate, eventController.updateEvent);
router.delete('/:id', auth, authorize('organizer', 'admin'), eventController.deleteEvent);

export default router;
