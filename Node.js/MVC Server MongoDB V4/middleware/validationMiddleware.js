export const validateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (!/^\d+$/.test(userId)) {
    return res.status(400).type('text').send('Invalid user ID');
  }

  next();
};

export const validateArticleId = (req, res, next) => {
  const { articleId } = req.params;

  if (!/^\d+$/.test(articleId)) {
    return res.status(400).type('text').send('Invalid article ID');
  }

  next();
};
