const apiRouter = require('express').Router();
const articlesRouter = require('./articles-router')
const express = require('express')

const { getTopics,
    getEndpoints,
    deleteComment,
    getUsers
  } = require('../controllers/app.controllers')


apiRouter.use('/articles', articlesRouter)

apiRouter.get('/', getEndpoints);

apiRouter.get('/topics', getTopics);

apiRouter.get('/users', getUsers)

apiRouter.delete('/comments/:comment_id', deleteComment)

module.exports = apiRouter;