import session from 'express-session';

export const sessionMiddleware = session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
});
