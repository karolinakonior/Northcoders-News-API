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
