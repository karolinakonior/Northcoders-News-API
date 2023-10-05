const express = require("express")
const app = express();

const { getTopics,
        getEndpoints,
        getArticleByID,
        getCommentsByArticleId,
        getArticles,
        deleteComment,
        patchArticle,
        postComment,
        getUsers
      } = require('./controllers/app.controllers')

app.use(express.json());

app.get('/api', getEndpoints);

app.get('/api/articles', getArticles)

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleByID);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postComment)

app.get('/api/users', getUsers)

app.delete('/api/comments/:comment_id', deleteComment)

app.patch('/api/articles/:article_id', patchArticle)

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Path not found.' });
  })


app.use((err, req, res, next) => {
    if (err.code === '22P02' || err.code === '23502') {
      res.status(400).send({ msg: 'Bad request.'});
    }
    if (err.code === '22003' || err.code === '23503') {
      res.status(404).send({ msg: 'Not found.'});
    }
    next(err);
  })  

 app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send(err.msg)
    }
    if (err.status === 400) {
      res.status(400).send(err.msg)
    }
 })
  
app.use((err, req, res, next) => {
      res.status(500).send({ msg: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' })
  })

module.exports = app;