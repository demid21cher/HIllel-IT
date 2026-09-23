import bcrypt from 'bcryptjs';

import { users } from '../data/users.js';

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const exists = users.find((user) => user.email === email);

    if (exists) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
    };

    users.push(user);

    console.log('USER CREATED:', user);

    // Авторизуємо користувача через Passport
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      console.log('USER AFTER LOGIN:', req.user);

      console.log('SESSION AFTER LOGIN:', req.session);

      console.log('AUTHENTICATED:', req.isAuthenticated());

      // Явно зберігаємо сесію перед відповіддю
      req.session.save((error) => {
        if (error) {
          return next(error);
        }

        return res.status(201).json({
          message: 'Registration successful',

          user: {
            id: user.id,
            email: user.email,
          },
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie('sid');

      return res.json({
        message: 'Logout successful',
      });
    });
  });
};
