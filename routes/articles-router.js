const articlesRouter = require('express').Router();
const express = require('express')

const {
    getArticleByID,
    getCommentsByArticleId,
    getArticles,
    patchArticle,
    postComment,
  } = require('../controllers/app.controllers')

articlesRouter.use(express.json());

articlesRouter
  .route('/')
  .get(getArticles)

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postComment)

articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticle)

module.exports = articlesRouter;