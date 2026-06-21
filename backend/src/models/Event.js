const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
      default: 0,
    },
    totalSeats: {
      type: Number,
      required: [true, 'Total seats is required'],
      min: 1,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    banner: {
      type: String,
      default: null,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ organizerId: 1 });
eventSchema.index({ category: 1 });

eventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
