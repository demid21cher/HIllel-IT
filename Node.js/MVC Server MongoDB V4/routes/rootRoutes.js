import express from 'express';

import { getRoot } from '../controllers/rootController.js';
import { loggerMiddleware } from '../middleware/loggerMiddleware.js';

const router = express.Router();

router.get('/', loggerMiddleware, getRoot);

export default router;
