import { Router } from 'express';
const router = Router();
import * as adminController from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import authorize from '../middleware/roles.js';

router.get('/users', auth, authorize('admin'), adminController.getUsers);
router.put('/users/:id/toggle-status', auth, authorize('admin'), adminController.toggleUserStatus);
router.get('/events', auth, authorize('admin'), adminController.getEvents);
router.get('/bookings', auth, authorize('admin'), adminController.getBookings);
router.get('/dashboard', auth, authorize('admin'), adminController.getDashboard);

export default router;
