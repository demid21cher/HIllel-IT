import express from 'express';

import { getDatabaseUsers } from '../controllers/databaseController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getDatabaseUsers);

export default router;
