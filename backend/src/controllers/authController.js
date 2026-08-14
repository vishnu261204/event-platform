import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import emailService from '../services/emailService.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict('Email already registered');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'attendee',
  });

  const token = generateToken(user._id);

  ApiResponse.created(res, {
    token,
    user,
  }, 'Registration successful');
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('Account deactivated');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const token = generateToken(user._id);

  ApiResponse.success(res, {
    token,
    user,
  }, 'Login successful');
});

export const getProfile = asyncHandler(async (req, res) => {
  ApiResponse.success(res, { user: req.user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ...(name && { name }), ...(avatar && { avatar }) },
    { new: true, runValidators: true }
  );

  ApiResponse.success(res, { user }, 'Profile updated');
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  ApiResponse.success(res, null, 'Password changed successfully');
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    ApiResponse.success(res, null, 'If the email exists, an OTP has been sent');
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.passwordResetOtp = otp;
  user.passwordResetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  const sent = await emailService.sendOtp(user.email, otp);
  if (!sent) {
    throw ApiError.internal('Failed to send OTP, please try again');
  }

  ApiResponse.success(res, null, 'OTP sent to your email');
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email }).select('+passwordResetOtp');
  if (
    !user ||
    !user.passwordResetOtp ||
    user.passwordResetOtp !== otp ||
    new Date(user.passwordResetOtpExpires) < new Date()
  ) {
    throw ApiError.badRequest('Invalid or expired OTP');
  }

  ApiResponse.success(res, null, 'OTP verified');
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;

  const user = await User.findOne({ email }).select('+passwordResetOtp +password');
  if (
    !user ||
    !user.passwordResetOtp ||
    user.passwordResetOtp !== otp ||
    new Date(user.passwordResetOtpExpires) < new Date()
  ) {
    throw ApiError.badRequest('Invalid or expired OTP');
  }

  user.password = password;
  user.passwordResetOtp = null;
  user.passwordResetOtpExpires = null;
  await user.save();

  ApiResponse.success(res, null, 'Password reset successfully');
});
