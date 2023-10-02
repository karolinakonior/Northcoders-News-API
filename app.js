const express = require("express")
const app = express();

const { getTopics } = require('./controllers/app.controllers')

app.get('/api/topics', getTopics)

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
  })

app.use((err, req, res, next) => {
    if(err.status == '500') {
      res.status(500).send({ msg: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' })
    }
    next(err)
  })

module.exports = app;