import express from 'express';

import rootRoutes from './routes/rootRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import {
  notFoundMiddleware,
  errorMiddleware,
} from './middleware/errorMiddleware.js';

const app = express();
const port = 3000;

// Парсинг JSON
app.use(express.json());

// Управління сесіями
app.use(sessionMiddleware);

// Routes
app.use('/', rootRoutes);
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

// 404
app.use(notFoundMiddleware);

// Error handler
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Сервер запущено за адресою http://localhost:${port}`);
});
