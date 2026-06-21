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
} from '../validators/authValidators.js';

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, updateProfileValidation, validate, authController.updateProfile);
router.put('/change-password', auth, changePasswordValidation, validate, authController.changePassword);

export default router;
