import express from 'express';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/databaseControllers.js';

const router = express.Router();

// READ
router.get('/', getUsers);

// CREATE ONE
router.post('/create', createUser);

// UPDATE ONE
router.put('/update/:id', updateUser);

// DELETE ONE
router.delete('/delete/:id', deleteUser);

export default router;
