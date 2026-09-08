export const getArticles = (req, res) => {
  res.type('text').send('Get articles route');
};

export const postArticles = (req, res) => {
  res.type('text').send('Post articles route');
};

export const getArticleById = (req, res) => {
  const articleId = req.params.articleId;

  res.type('text').send(`Get article with ID: ${articleId}`);
};

export const putArticleById = (req, res) => {
  const articleId = req.params.articleId;

  res.type('text').send(`Update article with ID: ${articleId}`);
};

export const deleteArticleById = (req, res) => {
  const articleId = req.params.articleId;

  res.type('text').send(`Delete article with ID: ${articleId}`);
};
