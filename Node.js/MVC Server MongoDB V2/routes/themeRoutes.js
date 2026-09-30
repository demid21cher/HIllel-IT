import express from 'express';

import { setTheme, getTheme } from '../controllers/themeController.js';

const router = express.Router();

router.get('/', getTheme);

router.post('/', setTheme);

export default router;
