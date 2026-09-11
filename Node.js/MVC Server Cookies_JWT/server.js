import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import rootRoutes from './routes/rootRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import themeRoutes from './routes/themeRoutes.js';

import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import { themeMiddleware } from './middleware/themeMiddleware.js';

import {
  notFoundMiddleware,
  errorMiddleware,
} from './middleware/errorMiddleware.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

// JSON
app.use(express.json());

// Дані з HTML-форм
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Статичні файли
app.use(express.static(path.join(__dirname, 'public')));

// Сесії
app.use(sessionMiddleware);

// Передає тему в PUG та EJS
app.use(themeMiddleware);

// Routes
app.use('/', rootRoutes);

app.use('/auth', authRoutes);

app.use('/theme', themeRoutes);

app.use('/users', userRoutes);

app.use('/articles', articleRoutes);

// 404
app.use(notFoundMiddleware);

// Error handler
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Сервер запущено за адресою http://localhost:${port}`);
});
