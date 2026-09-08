import express from 'express';

import {
  getArticles,
  postArticles,
  getArticleById,
  putArticleById,
  deleteArticleById,
} from '../controllers/articleController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

import { validateArticleId } from '../middleware/validationMiddleware.js';

import { articleAccessMiddleware } from '../middleware/articleAccessMiddleware.js';

const router = express.Router();

// /articles
router.get('/', authMiddleware, articleAccessMiddleware, getArticles);

router.post('/', authMiddleware, articleAccessMiddleware, postArticles);

// /articles/:articleId
router.get(
  '/:articleId',
  authMiddleware,
  validateArticleId,
  articleAccessMiddleware,
  getArticleById
);

router.put(
  '/:articleId',
  authMiddleware,
  validateArticleId,
  articleAccessMiddleware,
  putArticleById
);

router.delete(
  '/:articleId',
  authMiddleware,
  validateArticleId,
  articleAccessMiddleware,
  deleteArticleById
);

export default router;
