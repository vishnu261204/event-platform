const Booking = require('../models/Booking');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const bookingService = require('../services/bookingService');
const emailService = require('../services/emailService');

exports.createBooking = asyncHandler(async (req, res) => {
  const { eventId, quantity } = req.body;

  const result = await bookingService.createBooking(req.user._id, eventId, quantity);

  emailService.sendBookingConfirmation(
    req.user.email,
    result.booking,
    result.event,
    result.ticket
  );

  ApiResponse.created(res, {
    booking: result.booking,
    ticket: result.ticket,
  }, 'Booking confirmed');
});

exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id })
    .populate({
      path: 'eventId',
      select: 'title date time venue category banner price',
    })
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { bookings });
});

exports.getEventBookings = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized');
  }

  const bookings = await Booking.find({ eventId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { bookings });
});

exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.id, req.user._id);
  ApiResponse.success(res, { booking }, 'Booking cancelled');
});
