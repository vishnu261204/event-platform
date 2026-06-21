import Event from '../models/Event.js';
import Booking from '../models/Booking.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import bookingService from '../services/bookingService.js';

export const createBooking = asyncHandler(async (req, res) => {
  const { eventId, quantity } = req.body;
  const result = await bookingService.createBooking(req.user._id, eventId, quantity);
  ApiResponse.created(res, { booking: result.booking }, 'Booking confirmed');
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id })
    .populate({
      path: 'eventId',
      select: 'title date time venue category banner price',
    })
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { bookings });
});

export const getEventBookings = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) throw ApiError.notFound('Event not found');
  if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized');
  }
  const bookings = await Booking.find({ eventId })
    .populate('userId', 'name email')
    .populate('eventId', 'title price')
    .sort({ createdAt: -1 });
  ApiResponse.success(res, { bookings });
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.id, req.user._id);
  ApiResponse.success(res, { booking }, 'Booking cancelled');
});
