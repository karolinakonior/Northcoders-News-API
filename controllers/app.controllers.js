const { fetchTopics,
        fetchArticleById,
        fetchCommentsByArticleId,
        fetchArticles,
        findAndDeleteComment,
        insertComment,
        updateArticle,
        fetchUsers,
        fetchUsername,
        updateComment,
        insertArticle,
        insertTopic
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
    const limit = req.query.limit;
    const p = req.query.p;
   
    fetchCommentsByArticleId(articleId, limit, p).then(comments => {
        res.status(200).send({comments});
    })
    .catch(err => {
        next(err);
    })
}

exports.getArticles = (req, res, next) => {
    const topic = req.query.topic;
    const sortBy = req.query.sort_by;
    const order = req.query.order;
    const limit = req.query.limit;
    const p = req.query.p;

    fetchArticles(topic, sortBy, order, limit, p).then(articles => {
        res.status(200).send({ articles });
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

exports.getUsername = (req, res, next) => {
    const username = req.params.username
    fetchUsername(username).then(user => {
        res.status(200).send({user})
    })
    .catch(err => {
        next(err)
    })
}

exports.patchComment = (req, res, next) => {
    const commentId = req.params.comment_id;
    const votesToAdd = req.body.inc_votes;

    updateComment(commentId, votesToAdd).then(comment =>
        res.status(200).send({ comment }))
    .catch(err => {
        next(err)
    })
}

exports.postArticle = (req, res, next) => {
    const body = req.body;
    const article_img_url = req.body.article_img_url;

    insertArticle(body, article_img_url).then((article) => {
        res.status(201).send({article})
    })
    .catch(err => {
        next(err)
    })
}

exports.postTopic = (req, res, next) => {
    const slug = req.body.slug;
    const description = req.body.description;

    insertTopic(slug, description).then(topic => {
        res.status(201).send({topic})
    })
    .catch(err => {
        next(err)
    })

}