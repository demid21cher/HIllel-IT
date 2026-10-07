import session from 'express-session';

const isProduction = process.env.NODE_ENV === 'production';

export const sessionMiddleware = session({
  name: 'sid',

  secret: process.env.SESSION_SECRET || 'my-secret-key',

  resave: false,

  saveUninitialized: false,

  cookie: {
    httpOnly: true,

    secure: false,

    sameSite: 'lax',

    maxAge: 1000 * 60 * 60 * 24,
  },
});
