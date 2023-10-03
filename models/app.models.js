const db = require('../db/connection');
const format = require('pg-format');

exports.fetchTopics = () => {
    const topicsQuery = `SELECT * FROM topics;`;
    return db.query(topicsQuery).then(({ rows }) => {
        return rows;
    })   
}

exports.fetchArticleById = (articleID) => {
    return db.query(`SELECT * FROM articles
                    WHERE article_id = $1;`, [articleID])
    .then(({ rows }) => {
        return rows[0];
    })
}

exports.fetchCommentsByArticleId = (articleId) => {
    return db.query(`SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments
    LEFT JOIN articles
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    ORDER BY comments.created_at DESC;`, [articleId])
    .then(({rows}) => {
        return rows;
    })
    
}

exports.fetchArticles = () => {
    return db.query(`SELECT CAST(COUNT(comments) AS INT) AS comment_count, articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`
    )
    .then(({rows}) => {
        return rows;
    })
}

exports.updateArticle = (articleID, votesToAdd) => {
    return db.query(`SELECT votes FROM articles
                    WHERE article_id = $1;`, [articleID])
    .then(({ rows }) => {
        const currentVotes = rows[0].votes;
        const totalVotes = currentVotes + votesToAdd;

        return db.query(`UPDATE articles 
                        SET votes = $1
                        WHERE article_id = $2;`, [totalVotes, articleID])
    }).then(() => {
        return db.query(`SELECT * FROM articles
                        WHERE article_id = $1;`, [articleID])
    }).then(({ rows }) => {
        return rows[0];
    })
}