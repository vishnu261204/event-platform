const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middleware/auth');

router.get('/my-tickets', auth, ticketController.getMyTickets);
router.get('/:ticketId', auth, ticketController.getTicketById);

module.exports = router;
