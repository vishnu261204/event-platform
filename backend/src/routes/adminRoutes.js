const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/roles');

router.get('/users', auth, authorize('admin'), adminController.getUsers);
router.put('/users/:id/toggle-status', auth, authorize('admin'), adminController.toggleUserStatus);
router.get('/events', auth, authorize('admin'), adminController.getEvents);
router.get('/bookings', auth, authorize('admin'), adminController.getBookings);
router.get('/dashboard', auth, authorize('admin'), adminController.getDashboard);

module.exports = router;
