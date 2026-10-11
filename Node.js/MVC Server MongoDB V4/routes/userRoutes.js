import express from 'express';

import {
  getUsers,
  postUsers,
  getUserById,
  putUserById,
  deleteUserById,
} from '../controllers/userController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

import { validateUserId } from '../middleware/validationMiddleware.js';

const router = express.Router();

// /users
router.get('/', getUsers);

router.post('/', authMiddleware, postUsers);

// /users/:userId
router.get('/:userId', validateUserId, getUserById);

router.put('/:userId', authMiddleware, validateUserId, putUserById);

router.delete('/:userId', authMiddleware, validateUserId, deleteUserById);

export default router;
