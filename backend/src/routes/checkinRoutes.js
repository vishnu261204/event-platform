const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkinController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/roles');
const validate = require('../middleware/validation');
const { scanCheckinValidation } = require('../validators/checkinValidators');

router.post('/scan', auth, authorize('organizer', 'admin'), scanCheckinValidation, validate, checkinController.scanTicket);
router.get('/ticket/:ticketCode', auth, checkinController.getTicketByCode);

module.exports = router;
