import express from 'express';
import passport from '../config/passport.js';

import { register, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post(
  '/login',

  passport.authenticate('local', {
    failureMessage: true,
  }),

  (req, res) => {
    res.json({
      message: 'Login successful',

      user: {
        id: req.user.id,
        email: req.user.email,
      },
    });
  }
);

router.post('/logout', logout);

export default router;
