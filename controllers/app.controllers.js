const { fetchTopics,
        fetchArticleById,
        fetchCommentsByArticleId,
        fetchArticles,
        findAndDeleteComment,
        insertComment,
        updateArticle,
        fetchUsers
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
    const topic = req.query.topic;
    fetchArticles(topic).then((articles) => {
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

exports.getUsers = (req, res, next) => {
    fetchUsers().then(users => {
        res.status(200).send({ users });
    })
    .catch(err => {
        next(err)
    })
}


exports.patchArticle = (req, res, next) => {
    const articleID = req.params.article_id;
    const votesToAdd = req.body.inc_votes;

    updateArticle(articleID, votesToAdd).then(article => {
        res.status(200).send({ article })
    })
    .catch(err => {
        next(err)
    })
}