const { body } = require('express-validator');

const scanCheckinValidation = [
  body('ticketCode')
    .trim()
    .notEmpty().withMessage('Ticket code is required'),
];

const checkinByBookingValidation = [
  body('bookingId')
    .notEmpty().withMessage('Booking ID is required')
    .isMongoId().withMessage('Invalid booking ID'),
];

module.exports = {
  scanCheckinValidation,
  checkinByBookingValidation,
};
