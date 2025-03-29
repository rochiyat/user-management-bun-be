import { Router } from 'express';
import {
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/auth.controller';
import {
  validateLogin,
  validateRegister,
} from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

export default router;
