const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketCode: {
      type: String,
      unique: true,
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    qrCode: {
      type: String,
      default: null,
    },
    checkInStatus: {
      type: String,
      enum: ['pending', 'checked_in'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.index({ ticketCode: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);
