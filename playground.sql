\c nc_news_test;

SELECT * FROM articles;
SELECT * FROM topics;
SELECT * FROM comments;
SELECT * FROM users;



    INSERT INTO topics
    (slug, description)
    VALUES
    ('cafsfrs', 'everything about cars')
    RETURNING *;