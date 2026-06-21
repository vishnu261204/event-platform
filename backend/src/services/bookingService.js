const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const ApiError = require('../utils/ApiError');
const generateTicketCode = require('../utils/generateTicketCode');
const qrService = require('./qrService');

class BookingService {
  async createBooking(userId, eventId, quantity) {
    const event = await Event.findById(eventId);
    if (!event) {
      throw ApiError.notFound('Event not found');
    }

    if (event.status !== 'active') {
      throw ApiError.badRequest('Event is not active');
    }

    if (event.organizerId.toString() === userId.toString()) {
      throw ApiError.badRequest('Cannot book your own event');
    }

    if (event.availableSeats < quantity) {
      throw ApiError.badRequest(`Only ${event.availableSeats} seats available`);
    }

    event.availableSeats -= quantity;
    await event.save();

    const amount = event.price * quantity;
    const bookingId = `BK-${uuidv4().slice(0, 8).toUpperCase()}`;

    const booking = await Booking.create({
      bookingId,
      userId,
      eventId,
      quantity,
      amount,
    });

    const ticketCode = await generateTicketCode(Booking);

    const qrData = {
      ticketCode,
      bookingId: booking._id.toString(),
      eventId: event._id.toString(),
      userId: userId.toString(),
    };

    const qrPath = await qrService.generate(qrData);

    const ticket = await Ticket.create({
      ticketCode,
      bookingId: booking._id,
      qrCode: qrPath,
    });

    return { booking, ticket, event };
  }

  async cancelBooking(bookingId, userId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw ApiError.notFound('Booking not found');
    }

    if (booking.userId.toString() !== userId.toString()) {
      throw ApiError.forbidden('Not authorized to cancel this booking');
    }

    if (booking.bookingStatus === 'cancelled') {
      throw ApiError.badRequest('Booking already cancelled');
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.availableSeats += booking.quantity;
      await event.save();
    }

    await Ticket.findOneAndUpdate(
      { bookingId: booking._id },
      { checkInStatus: 'checked_in' }
    );

    return booking;
  }
}

module.exports = new BookingService();
