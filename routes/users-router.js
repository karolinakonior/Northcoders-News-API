const usersRouter = require('express').Router();

const { getUsers,
        getUsername
} = require('../controllers/app.controllers')

usersRouter
  .route('/')
  .get(getUsers)

usersRouter
  .route('/:username')
  .get(getUsername)

module.exports = usersRouter;