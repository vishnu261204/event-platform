const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

exports.scanTicket = asyncHandler(async (req, res) => {
  const { ticketCode } = req.body;

  const ticket = await Ticket.findOne({ ticketCode });
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: 'Invalid ticket',
    });
  }

  const booking = await Booking.findById(ticket.bookingId);
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found',
    });
  }

  const event = await Event.findById(booking.eventId);
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }

  if (
    event.organizerId.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    throw ApiError.forbidden('Not authorized to check in for this event');
  }

  if (ticket.checkInStatus === 'checked_in') {
    return res.status(400).json({
      success: false,
      message: 'Ticket already checked in',
    });
  }

  ticket.checkInStatus = 'checked_in';
  await ticket.save();

  ApiResponse.success(res, {
    ticket,
    booking: {
      bookingId: booking.bookingId,
      quantity: booking.quantity,
    },
    event: {
      title: event.title,
      date: event.date,
      venue: event.venue,
    },
  }, 'Check-in successful');
});

exports.getTicketByCode = asyncHandler(async (req, res) => {
  const { ticketCode } = req.params;

  const ticket = await Ticket.findOne({ ticketCode })
    .populate({
      path: 'bookingId',
      populate: {
        path: 'eventId',
        select: 'title date time venue organizerId',
      },
    });

  if (!ticket) {
    throw ApiError.notFound('Ticket not found');
  }

  ApiResponse.success(res, { ticket });
});
