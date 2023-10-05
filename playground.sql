\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;
SELECT * FROM users;

SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'articles';