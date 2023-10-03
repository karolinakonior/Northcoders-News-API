const { fetchTopics,
        fetchArticles
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
        next(err)
    })
}

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => {
        if (articles.length === 0) {
            res.status(404).send({ msg: "Not found." })
        } else {
            res.status(200).send({ articles })
        }
    })
    .catch((err) => {
        next(err)
    })
}