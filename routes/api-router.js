const apiRouter = require('express').Router();
const articlesRouter = require('./articles-router')
const usersRouter = require('./users-router');

const { getTopics,
        getEndpoints,
        deleteComment
  } = require('../controllers/app.controllers');

apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)

apiRouter
 .route('/')
 .get(getEndpoints)

apiRouter
  .route('/topics')
  .get(getTopics)

apiRouter
  .route('/comments/:comment_id')
  .delete(deleteComment)

module.exports = apiRouter;