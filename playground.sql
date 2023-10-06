\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;
SELECT * FROM users;

SELECT CAST(COUNT(comments) AS INT) AS comment_count, articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url FROM articles
LEFT JOIN comments 
ON articles.article_id = comments.article_id
GROUP BY articles.article_id ORDER BY created_at DESC;