\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;

SELECT * FROM users;

SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments
LEFT JOIN articles
ON comments.article_id = articles.article_id
WHERE articles.article_id = 5
ORDER BY comments.created_at DESC;

-- SELECT SUM(votes) AS INT
-- FROM payment
-- WHERE customer_id = 2000;