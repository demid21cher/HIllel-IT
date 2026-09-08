import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Get root route');
});

app.get('/users', (req, res) => {
  res.send('Get users route');
});

app.post('/users', (req, res) => {
  res.send('Post users route');
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`Get user with ID: ${userId}`);
});

app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`Update user with ID: ${userId}`);
});

app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`Delete user with ID: ${userId}`);
});

app.get('/articles', (req, res) => {
  res.send('Get articles route');
});

app.post('/articles', (req, res) => {
  res.send('Post articles route');
});

app.get('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  res.send(`Get article with ID: ${articleId}`);
});

app.put('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  res.send(`Update article with ID: ${articleId}`);
});

app.delete('/articles/:articleId', (req, res) => {
  const articleId = req.params.articleId;
  res.send(`Delete article with ID: ${articleId}`);
});

app.listen(port, () => {
  console.log(`Сервер запущено за адресою <http://localhost>:${port}`);
});
