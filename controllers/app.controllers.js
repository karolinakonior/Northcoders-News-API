const { fetchTopics,
        fetchArticles,
        fetchArticleById,
        insertComment
      } = require("../models/app.models")

const endpoints = require('../endpoints.json')

exports.getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
        res.status(200).send({ topics })
    })
    .catch((err) => {
        next(err);
    })
}

exports.getEndpoints = (req, res, next) => {
    res.status(200).send(endpoints)
    .catch((err) => {
        next(err);
    })
}

exports.getArticleByID = (req, res, next) => {
    const articleID = req.params.article_id
    fetchArticleById(articleID).then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err);
    })
}

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => {
        res.status(200).send({ articles })
    })
    .catch((err) => {
        next(err);

    })
}

exports.postComment = (req, res, next) => {
    const body = req.body.body;
    const articleId = req.params.article_id;
    const username = req.body.username;

    insertComment(username, body, articleId).then(comment => {
        res.status(201).send({ comment })
    })
    .catch(err => {
        next(err)
    })
}






