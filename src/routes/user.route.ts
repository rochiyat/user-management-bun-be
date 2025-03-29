import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import {
  validateGetUserById,
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
} from '../middlewares/user.middleware';

const router = Router();

router.get('/', getUsers);
router.get('/:id', validateGetUserById, getUserById);
router.post('/', validateCreateUser, createUser);
router.put('/:id', validateUpdateUser, updateUser);
router.delete('/:id', validateDeleteUser, deleteUser);

export default router;
