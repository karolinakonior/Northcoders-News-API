const db = require('../db/connection');
const format = require('pg-format');

exports.fetchTopics = () => {
    const topicsQuery = `SELECT * FROM topics;`;
    return db.query(topicsQuery).then(({ rows }) => {
        return rows;
    })   
}
