const db = require('../db/connection')
const { getTopics } = require('../controllers/app.controllers')
const format = require('pg-format')

exports.fetchTopics = () => {
    const topicsQuery = `SELECT * FROM topics;`;
    return db.query(topicsQuery).then(({ rows }) => {
        return rows;
    })
}