export const articleAccessMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).type('text').send('Authentication required');
  }

  const { articleId } = req.params;

  if (articleId === '0') {
    return res.status(403).type('text').send('Access denied to this article');
  }

  next();
};
