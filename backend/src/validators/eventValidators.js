const { body } = require('express-validator');

const createEventValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Description must be 10-5000 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('venue')
    .trim()
    .notEmpty().withMessage('Venue is required'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format'),
  body('time')
    .trim()
    .notEmpty().withMessage('Time is required'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('totalSeats')
    .notEmpty().withMessage('Total seats is required')
    .isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
];

const updateEventValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 }).withMessage('Description must be 10-5000 characters'),
  body('category')
    .optional()
    .trim(),
  body('venue')
    .optional()
    .trim(),
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format'),
  body('time')
    .optional()
    .trim(),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('totalSeats')
    .optional()
    .isInt({ min: 1 }).withMessage('Total seats must be at least 1'),
];

module.exports = {
  createEventValidation,
  updateEventValidation,
};
