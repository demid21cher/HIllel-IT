import express from 'express';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/',

  authMiddleware,

  (req, res) => {
    res.json({
      message: 'Welcome to protected route',

      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  }
);

export default router;
