const express = require("express")
const app = express();

const { getTopics,
        getEndpoints,
        getArticles
      } = require('./controllers/app.controllers')

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Path not found' })
  })

app.use((err, req, res, next) => {
      res.status(500).send({ msg: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' })
  })

module.exports = app;