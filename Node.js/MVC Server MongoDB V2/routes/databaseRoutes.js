import express from 'express';

import {
  getDatabaseUsers,
  createUser,
  createManyUsers,
  updateUser,
  updateManyUsers,
  replaceUser,
  deleteUser,
  deleteManyUsers,
} from '../controllers/databaseController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// READ
router.get('/', authMiddleware, getDatabaseUsers);

// CREATE ONE
router.post('/create', authMiddleware, createUser);

// CREATE MANY
router.post('/create-many', authMiddleware, createManyUsers);

// UPDATE ONE
router.put('/update/:id', authMiddleware, updateUser);

// UPDATE MANY
router.put('/update-many', authMiddleware, updateManyUsers);

// REPLACE ONE
router.put('/replace/:id', authMiddleware, replaceUser);

// DELETE ONE
router.delete('/delete/:id', authMiddleware, deleteUser);

// DELETE MANY
router.delete('/delete-many', authMiddleware, deleteManyUsers);

export default router;
