const db = require('../db/connection');
const format = require('pg-format');

exports.fetchTopics = () => {
    const topicsQuery = `SELECT * FROM topics;`;
    return db.query(topicsQuery).then(({ rows }) => {
        return rows;
    })   
}

exports.fetchArticleById = (articleID) => {
    return db.query(`
    SELECT CAST(COUNT(comments) AS INT) AS comment_count, articles.title, articles.article_id, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
    `, [articleID])
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

exports.fetchArticles = (topic, sortBy = 'created_at', order = 'desc') => {
   return db.query(`SELECT slug FROM topics`)
    .then(({rows}) => {
        return rows.map(row => row.slug)
    }).then(existingTopics => {
   
    const validSortBy = [ 'article_id', 'title', 'topic', 'author', 'body', 'created_at', 'votes', 'article_img_url'];

    const validOrder = ['asc', 'desc']

    if (!validSortBy.includes(sortBy)) {
        return Promise.reject({status: 400, msg: "Bad request."})
    }

    if(!validOrder.includes(order)) {
        return Promise.reject({status: 400, msg: "Bad request."})
    }

    let queryString = `
    SELECT CAST(COUNT(comments) AS INT) AS comment_count, articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url FROM articles
    LEFT JOIN comments 
    ON articles.article_id = comments.article_id
    `

    if (topic) {
   
        if (existingTopics.includes(topic)) {
            queryString += `WHERE topic = '${topic}'`;
        } else {
            return Promise.reject({status: 404, msg: "Not found."})
        }
    }
 
    queryString += ` GROUP BY articles.article_id ORDER BY ${sortBy} ${order};`

    return db.query(queryString)
    .then(({rows}) => {
        return rows;
    })
})
}

exports.insertComment = (username, body, articleId) => {
    const values = [username, body, articleId]

    const queryString = `INSERT INTO comments 
    (author, body, article_id) 
    VALUES 
    ($1, $2, $3)
    RETURNING *;`

    const queryValues = [username, body, articleId];
    
    return db.query(queryString, queryValues).then((result)=>{
        return result.rows[0]
    })
}

exports.fetchUsers = () => {
    return db.query(`SELECT * FROM users;`)
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
                        WHERE article_id = $2
                        RETURNING *;`, [totalVotes, articleID])
    }).then(({rows}) => {
        return rows[0];
    })
}

exports.findAndDeleteComment = (commentID) => {
    return db.query(`DELETE FROM comments
                     WHERE comment_id = $1;`, [commentID])
}

exports.fetchUsername = (username) => {
    return db.query(`SELECT username FROM users;`)
    .then(({ rows }) => {
        return rows.map(username => username.username);
    })
    .then(existingUsernames => {

        if(!existingUsernames.includes(username)) {
            return Promise.reject({status: 404, msg: "Not found."})
        }

        return db.query(`
        SELECT * FROM users
        WHERE username = $1`, [username])
    })
    .then(({rows}) => {
        return rows[0];
    })
}

exports.updateComment = (commentID, votesToAdd) => {

    return db.query(`SELECT * FROM comments
                    WHERE comment_id = $1;`, [commentID])
    .then(({ rows }) => {
        if(rows[0] === undefined) {
            return Promise.reject({status: 404, msg: "Not found."})
        }
        const currentVotes = rows[0].votes;
        const totalVotes = currentVotes + votesToAdd
      
        return db.query(`UPDATE comments
                        SET votes = $1
                        WHERE comment_id = $2
                        RETURNING *;`, [totalVotes, commentID])
    }).then(({rows}) => {
        return rows[0];
    })
}

exports.insertArticle = (sentBody, article_img_url = `https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700`) => {
    const author = sentBody.author;
    const body = sentBody.body;
    const title = sentBody.title;
    const topic = sentBody.topic;

    const queryValues = [author, title, body, topic, article_img_url]

    const queryString = format(`
    INSERT INTO articles 
    (author, title, body, topic, article_img_url) 
    VALUES 
    %L
    RETURNING *;`, [queryValues])

    return db.query(queryString)
    .then(({rows}) => {
        const article_id = rows[0].article_id
        return db.query(`
        SELECT CAST(COUNT(comments) AS INT) AS comment_count, articles.body, articles.article_img_url, articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url FROM articles
        LEFT JOIN comments 
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = ${article_id}
        GROUP BY articles.article_id;`)
        .then(({rows}) => {
            return rows[0]
        })
    })
  
}