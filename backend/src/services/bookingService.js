const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Counter = require('../models/Counter');
const ApiError = require('../utils/ApiError');

async function getNextBookingId() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'booking' },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  );
  return `BOOK-${counter.sequence.toString().padStart(6, '0')}`;
}

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

    const bookingId = await getNextBookingId();
    const totalAmount = event.price * quantity;

    let booking;
    try {
      booking = await Booking.create({ userId, eventId, quantity, bookingId, totalAmount });
    } catch (err) {
      event.availableSeats += quantity;
      await event.save();
      throw err;
    }

    return { booking, event };
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

    return booking;
  }
}

module.exports = new BookingService();
