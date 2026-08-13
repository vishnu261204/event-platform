import { Router } from 'express';
const router = Router();
import * as authController from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validation.js';
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  verifyOtpValidation,
  resetPasswordValidation,
} from '../validators/authValidators.js';

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/forgot-password', forgotPasswordValidation, validate, authController.forgotPassword);
router.post('/verify-otp', verifyOtpValidation, validate, authController.verifyOtp);
router.post('/reset-password', resetPasswordValidation, validate, authController.resetPassword);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, updateProfileValidation, validate, authController.updateProfile);
router.put('/change-password', auth, changePasswordValidation, validate, authController.changePassword);

export default router;
