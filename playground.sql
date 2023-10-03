\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;


UPDATE articles
SET votes = 5
WHERE article_id = 3;


SELECT * FROM articles
WHERE article_id = 8;

SELECT votes FROM articles
WHERE article_id = 1;

-- SELECT SUM(votes) AS INT
-- FROM payment
-- WHERE customer_id = 2000;