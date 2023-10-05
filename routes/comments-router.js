const commentsRouter = require('express').Router();
const express = require('express')

const { deleteComment,
        patchComment
} = require('../controllers/app.controllers');


commentsRouter.use(express.json());

commentsRouter
  .route('/:comment_id')
  .delete(deleteComment)

commentsRouter
  .route('/:comment_id')
  .patch(patchComment)


module.exports = commentsRouter;