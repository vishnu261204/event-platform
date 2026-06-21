const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

exports.getMyTickets = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).select('_id');
  const bookingIds = bookings.map((b) => b._id);

  const tickets = await Ticket.find({ bookingId: { $in: bookingIds } })
    .populate({
      path: 'bookingId',
      populate: {
        path: 'eventId',
        select: 'title date time venue category banner price',
      },
    })
    .sort({ createdAt: -1 });

  ApiResponse.success(res, { tickets });
});

exports.getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId)
    .populate({
      path: 'bookingId',
      populate: {
        path: 'eventId',
        select: 'title date time venue category banner price',
      },
    });

  if (!ticket) {
    throw ApiError.notFound('Ticket not found');
  }

  const booking = await Booking.findById(ticket.bookingId);
  if (
    booking.userId.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    throw ApiError.forbidden('Not authorized');
  }

  ApiResponse.success(res, { ticket });
});
