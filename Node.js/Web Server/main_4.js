import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '80b' }));
app.use(express.urlencoded({ limit: '80b', extended: true }));

function sanitizeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/error-test', (req, res, next) => {
  throw new Error('Критична помилка в базі даних або логіці!');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email || !name.trim() || !email.trim()) {
    return res.status(400).json({
      error: 'Помилка 400: Поля name та email не можуть бути порожніми.',
    });
  }

  const cleanName = sanitizeHTML(name.trim());
  const cleanEmail = sanitizeHTML(email.trim());

  console.log('Очищені дані:', { name: cleanName, email: cleanEmail });

  res.send(`Вітаємо, ${cleanName}! Ваш email: ${cleanEmail}`);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res
      .status(413)
      .send('Помилка 413: Payload Too Large (розмір запиту перевищує 80 Б)');
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Помилка сервера:', err.stack);

  res.status(500).sendFile(path.join(__dirname, 'views', '500.html'));
});

io.on('connection', (socket) => {
  console.log('Користувач підключився:', socket.id);

  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });
});

httpServer.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000');
});
