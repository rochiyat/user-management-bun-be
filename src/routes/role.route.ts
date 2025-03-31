import { Router } from 'express';
import {
  createRole,
  deleteRole,
  getRoleById,
  getRoles,
  updateRole,
} from '../controllers/role.controller';
import {
  validateCreateRole,
  validateUpdateRole,
  validateDeleteRole,
  validateGetRoleById,
  validateGetRoles,
} from '../middlewares/role.middleware';

const router = Router();

router.get('/', validateGetRoles, getRoles);
router.get('/:id', validateGetRoleById, getRoleById);
router.post('/', validateCreateRole, createRole);
router.put('/:id', validateUpdateRole, updateRole);
router.delete('/:id', validateDeleteRole, deleteRole);

export default router;
