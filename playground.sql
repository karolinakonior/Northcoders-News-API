\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;

SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments
LEFT JOIN articles
ON comments.article_id = articles.article_id
WHERE articles.article_id = 5
ORDER BY comments.created_at DESC;

-- comment_id
-- votes
-- created_at
-- author
-- body
-- article_id