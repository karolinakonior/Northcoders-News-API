const { fetchTopics,
        fetchArticleById,
        fetchCommentsByArticleId,
        fetchArticles,
        findAndDeleteComment
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

exports.getCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id;
    fetchCommentsByArticleId(articleId).then(comments => {
        res.status(200).send({comments});
    })
    .catch(err => {
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

exports.deleteComment = (req, res, next) => {
    const commentID = req.params.comment_id;
    findAndDeleteComment(commentID).then((result) => {
        res.status(204).send()
    })
    .catch(err => {
        next(err)
    })
}