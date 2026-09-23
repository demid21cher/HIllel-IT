const articles = [
  {
    id: 1,
    title: 'Перша стаття',
    author: 'Іван Петренко',
    content: 'Це текст першої статті.',
  },
  {
    id: 2,
    title: 'Друга стаття',
    author: 'Марія Коваль',
    content: 'Це текст другої статті.',
  },
  {
    id: 3,
    title: 'Третя стаття',
    author: 'Олександр Бондар',
    content: 'Це текст третьої статті.',
  },
];

export const getArticles = (req, res) => {
  res.render('articles/index.ejs', {
    articles,
  });
};

export const postArticles = (req, res) => {
  res.type('text').send('Post articles route');
};

export const getArticleById = (req, res) => {
  const articleId = Number(req.params.articleId);

  const article = articles.find((item) => item.id === articleId);

  if (!article) {
    return res.status(404).send('Article not found');
  }

  res.render('articles/details.ejs', {
    article,
  });
};

export const putArticleById = (req, res) => {
  const articleId = req.params.articleId;

  res.type('text').send(`Update article with ID: ${articleId}`);
};

export const deleteArticleById = (req, res) => {
  const articleId = req.params.articleId;

  res.type('text').send(`Delete article with ID: ${articleId}`);
};
