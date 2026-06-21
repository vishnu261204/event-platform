import Event from '../models/Event.js';
import cloudinary from '../config/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

function getBannerUrl(req) {
  if (!req.file) return null;
  if (req.file.path?.startsWith?.('http')) return req.file.path;
  return `/uploads/events/${req.file.filename}`;
}

function getPublicId(url) {
  if (!url || !url.includes('res.cloudinary.com')) return null;
  const parts = url.split('/');
  const uploadIdx = parts.indexOf('upload');
  if (uploadIdx === -1) return null;
  return parts.slice(uploadIdx + 2).join('/').replace(/\.[^.]+$/, '');
}

export const createEvent = asyncHandler(async (req, res) => {
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
    banner: getBannerUrl(req),
  });

  ApiResponse.created(res, { event }, 'Event created');
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to update this event');
  }

  if (req.file) {
    const oldPublicId = getPublicId(event.banner);
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId).catch(() => {});
    }
  }

  const updates = { ...req.body };
  if (req.file) {
    updates.banner = getBannerUrl(req);
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

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to delete this event');
  }

  const publicId = getPublicId(event.banner);
  if (publicId) {
    await cloudinary.uploader.destroy(publicId).catch(() => {});
  }

  event.status = 'cancelled';
  await event.save();

  ApiResponse.success(res, null, 'Event cancelled');
});

export const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizerId: req.user._id }).sort({ createdAt: -1 });
  ApiResponse.success(res, { events });
});

export const getAllEvents = asyncHandler(async (req, res) => {
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

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate('organizerId', 'name email');

  if (!event) {
    throw ApiError.notFound('Event not found');
  }

  ApiResponse.success(res, { event });
});
