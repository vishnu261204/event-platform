const Event = require('../models/Event');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

exports.createEvent = asyncHandler(async (req, res) => {
  const { title, description, category, venue, date, time, price, totalSeats } = req.body;

  const event = await Event.create({
    title,
    description,
    category,
    venue,
    date,
    time,
    price,
    totalSeats,
    organizerId: req.user._id,
    banner: req.file ? `/uploads/events/${req.file.filename}` : null,
  });

  ApiResponse.created(res, { event }, 'Event created');
});

exports.updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to update this event');
  }

  const updates = { ...req.body };
  if (req.file) {
    updates.banner = `/uploads/events/${req.file.filename}`;
  }

  if (updates.totalSeats) {
    const soldSeats = event.totalSeats - event.availableSeats;
    const newAvailable = parseInt(updates.totalSeats) - soldSeats;
    updates.availableSeats = Math.max(0, newAvailable);
  }

  const updated = await Event.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  ApiResponse.success(res, { event: updated }, 'Event updated');
});

exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to delete this event');
  }

  event.status = 'cancelled';
  await event.save();

  ApiResponse.success(res, null, 'Event cancelled');
});

exports.getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizerId: req.user._id }).sort({ createdAt: -1 });
  ApiResponse.success(res, { events });
});

exports.getAllEvents = asyncHandler(async (req, res) => {
  const { search, category, status, page = 1, limit = 12 } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (category) {
    query.category = category;
  }

  query.status = status || 'active';

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const events = await Event.find(query)
    .populate('organizerId', 'name email')
    .sort({ date: 1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Event.countDocuments(query);

  ApiResponse.success(res, {
    events,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
    },
  });
});

exports.getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('organizerId', 'name email');

  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  ApiResponse.success(res, { event });
});
