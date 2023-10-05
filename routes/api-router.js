const apiRouter = require('express').Router();
const articlesRouter = require('./articles-router')
const usersRouter = require('./users-router');
const commentsRouter = require('./comments-router')
const express = require('express')

const { getTopics,
        getEndpoints,
  } = require('../controllers/app.controllers');

apiRouter.use(express.json());

apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/comments', commentsRouter)

apiRouter
 .route('/')
 .get(getEndpoints)

apiRouter
  .route('/topics')
  .get(getTopics)

module.exports = apiRouter;