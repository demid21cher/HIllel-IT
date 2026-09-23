import 'dotenv/config';

import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/database.js';
import passport from './config/passport.js';

import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';
import databaseRoutes from './routes/databaseRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import rootRoutes from './routes/rootRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { sessionMiddleware } from './middleware/sessionMiddleware.js';
import { themeMiddleware } from './middleware/themeMiddleware.js';

import {
  errorMiddleware,
  notFoundMiddleware,
} from './middleware/errorMiddleware.js';

const app = express();

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionMiddleware);

app.use(passport.initialize());

app.use(passport.session());

app.use(themeMiddleware);

app.use('/', rootRoutes);

app.use('/auth', authRoutes);

app.use('/theme', themeRoutes);

app.use('/users', userRoutes);

app.use('/articles', articleRoutes);

app.use('/protected', protectedRoutes);

app.use('/database', databaseRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

await connectDB();

app.listen(port, () => {
  console.log(`Сервер запущено за адресою http://localhost:${port}`);
});
