export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).type('text').send('Authentication required');
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || token !== 'valid-token') {
    return res.status(401).type('text').send('Invalid authentication token');
  }

  req.user = {
    id: '1',
    role: 'user',
  };

  next();
};
