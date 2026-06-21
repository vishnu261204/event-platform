const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw ApiError.notFound('User not found');
  user.isActive = !user.isActive;
  await user.save();
  ApiResponse.success(res, { user }, `User ${user.isActive ? 'activated' : 'deactivated'}`);
});

exports.getDashboard = asyncHandler(async (req, res) => {
  const [totalUsers, totalEvents, totalBookings] = await Promise.all([
    User.countDocuments(),
    Event.countDocuments({ status: 'active' }),
    Booking.countDocuments(),
  ]);

  ApiResponse.success(res, { totalUsers, totalEvents, totalBookings });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role } = req.query;
  const query = {};
  if (role) query.role = role;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  const total = await User.countDocuments(query);
  ApiResponse.success(res, { users, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
});

exports.getEvents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const query = {};
  if (status) query.status = status;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const events = await Event.find(query).populate('organizerId', 'name email').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  const total = await Event.countDocuments(query);
  ApiResponse.success(res, { events, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
});

exports.getBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const query = {};
  if (status) query.bookingStatus = status;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const bookings = await Booking.find(query).populate('userId', 'name email').populate('eventId', 'title date venue price').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  const total = await Booking.countDocuments(query);
  ApiResponse.success(res, { bookings, pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) } });
});
