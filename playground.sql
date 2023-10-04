\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;

SELECT * FROM users;

SELECT * FROM articles
WHERE article_id = 8;

-- SELECT SUM(votes) AS INT
-- FROM payment
-- WHERE customer_id = 2000;