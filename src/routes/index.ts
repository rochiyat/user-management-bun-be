import { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';
import roleRoute from './role.route';
const router = Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/roles', roleRoute);

export default router;
