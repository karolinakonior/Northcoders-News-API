const db = require('../db/connection');
const app = require('../app');
const request = require("supertest");
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');


beforeEach(() => {
    return seed(testData);
});
afterAll(()=>{
    return db.end();
})

describe('GET /api/articles', () => {
    test('GET: 200 sends and array of all articles to the client sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })  
})

describe('GET /api/articles - queries', () => {
    test('GET: 200 accepts a topic query and sends an array of filtered topics sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(12);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: 'mitch',
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a topic query and sends an array of filtered topics sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(1);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: 'cats',
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a sort by query and sends an array of all articles sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?sort_by=author')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('author', { descending: true });
            expect(response.body.articles).toHaveLength(13);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a sort by and topic query and sends an array of all arrays sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?sort_by=author&topic=mitch')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('author', { descending: true });
            expect(response.body.articles).toHaveLength(12);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: 'mitch',
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts an order query and sends an array of sorted articles in ascending order (defaulting to descending when order is not provided)', () => {
        return request(app)
        .get('/api/articles?order=asc')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { ascending: true });
            expect(response.body.articles).toHaveLength(13);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 sends and array of all articles to the client sorted by date in descending order when the query is misspelt', () => {
        return request(app)
        .get('/api/articles?invalid-query=dogs')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    }) 
    test('GET: 200 sends and array of all articles to the client of specific topic sorted by author in ascending order', () => {
        return request(app)
        .get('/api/articles?topic=mitch&order=asc&sort_by=author')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('author', { ascending: true });
            expect(response.body.articles).toHaveLength(12);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: 'mitch',
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a limit query and sends an array of limited articles sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?limit=11')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(11);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a limit and p query that specifies the page at which to start limit and sends an array of limited articles sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?limit=10&p=2')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(3);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a limit and p query that specifies the page at which to start limit and sends an array of limited articles sorted by date in descending order', () => {
        return request(app)
        .get('/api/articles?limit=3&p=2')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(3);
        })
    })
    test('GET: 200 accepts a p query that specifies the page at which to start limit, sends an array of limited articles of defaulted limit 10 when limit is not provided', () => {
        return request(app)
        .get('/api/articles?0&p=2')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(3);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
    test('GET: 200 accepts a limit query and sends an array of limited articles that has a total_count of rows property (before pagination)', () => {
        return request(app)
        .get('/api/articles?0&p=2')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', { descending: true });
            expect(response.body.articles).toHaveLength(3);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number),
                        total_count: 13
                    })
                  );
            })
        })
    })  
    test('GET: 200 sends and empty array to the client when topic exists but is not associated with any article', () => {
        return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toEqual([]);
        })
    })
    test('GET: 200 combines all queries and sends an array of all articles matching the queries', () => {
        return request(app)
        .get('/api/articles?topic=mitch&sort_by=author&order=asc&limit=10&p=2')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('author', { ascending: true });
            expect(response.body.articles).toHaveLength(2);
            response.body.articles.forEach(article => {
                expect(typeof article).toBe('object');
                expect(article).toEqual(
                    expect.objectContaining({
                        comment_count: expect.any(String),
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: 'mitch',
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number)
                    })
                  );
            })
        })
    })
})

describe('GET /api/articles - error handling', () => {
    test('GET: 400 sends an appropriate status and error message when given an ivalid order', () => {
        return request(app)
        .get('/api/articles?order=invalid-order')
        .expect(400)
        .then((response) => {
           expect(response.text).toBe('Bad request.')
        })
    })
    test('GET: 400 sends an appropriate status and error message when given a valid topic and non-existent sort_by', () => {
        return request(app)
        .get('/api/articles?sort_by=invalid-sort-by&topic=mitch')
        .expect(400)
        .then((response) => {
           expect(response.text).toBe('Bad request.')
        })
    })
    test('GET: 404 sends an appropriate status and error message when given a valid sort by and non-existent topic', () => {
        return request(app)
        .get('/api/articles?sort_by=author&topic=not-a-topic')
        .expect(404)
        .then((response) => {
           expect(response.text).toBe('Not found.')
        })
    })
    test('GET: 400 sends an appropriate status and error message when given an invalid sort by', () => {
        return request(app)
        .get('/api/articles?sort_by=invalid-sort-by')
        .expect(400)
        .then((response) => {
           expect(response.text).toBe('Bad request.')
        })
    }) 
    test('GET: 404 sends an appropriate status and error message when given a non-existent topic', () => {
        return request(app)
        .get('/api/articles?topic=dogs')
        .expect(404)
        .then((response) => {
           expect(response.text).toBe('Not found.')
        })
    })
    test('GET: 404 sends an appropriate status and error message when given a limit and p query that is bigger than number of pages', () => {
        return request(app)
        .get('/api/articles?limit=3&p=25')
        .expect(404)
        .then((response) => {
            expect(response.text).toBe('Not found.')
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('GET: 200 sends an array with article of correct ID', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((article) => {
            expect(article.body.article).toEqual(expect.objectContaining({
                article_id: 2,
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                author: "icellusedkars",
                body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                created_at: "2020-10-16T05:03:00.000Z",
                article_img_url:  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                votes: 0
              }))
        })
    });
    test('GET: 200 sends an array with article of correct ID and has a property of comment_count which counts comments associated with the article', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((article) => {
            expect(article.body.article).toEqual(expect.objectContaining({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                article_img_url:  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                votes: 100,
                comment_count: 11
              }))
            expect(article.body.article.comment_count).toBe(11);
        })
    });
    test('GET: 200 sends an array with article of correct ID and has a property of comment_count which counts comments associated with the article', () => {
        return request(app)
        .get('/api/articles/4')
        .expect(200)
        .then((article) => {
            expect(article.body.article).toEqual(expect.objectContaining({
                comment_count: 0
              }))
            expect(article.body.article.comment_count).toBe(0);
        })
    });
    test('GET: 400 sends an appropriate status and error message when given an invalid id', () => {
        return request(app)
        .get('/api/articles/not-an-id')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('GET: 404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/99999999999999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not found.');
          });
      });
})

describe('POST /api/articles', () => {
    test('POST: 201 posts an article and responds with the posted article - article img url defaults when not provided', () => {
        const article = { 
            author: "rogersop",
            title: "The greatest cat of 2023",
            body: "This article is about the greatest cat of 2023",
            topic: "cats",
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(201)
        .then((response) => {
            expect(response.body.article).toEqual(expect.objectContaining({
                article_id: 14,
                title: "The greatest cat of 2023",
                topic: "cats",
                author: "rogersop",
                body: "This article is about the greatest cat of 2023",
                created_at: expect.any(String),
                votes: 0,
                article_img_url: `https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700`,
                comment_count: 0
                })
              );
      });
    })
    test('POST: 201 posts an article and responds with the posted article', () => {
        const article = { 
            author: "rogersop",
            title: "The greatest cat of 2023",
            body: "This article is about the greatest cat of 2023",
            topic: "cats",
            article_img_url: "https://images.pexels.com/photos/97050"
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(201)
        .then((response) => {
            expect(response.body.article).toEqual(expect.objectContaining({
                article_id: 14,
                title: "The greatest cat of 2023",
                topic: "cats",
                author: "rogersop",
                body: "This article is about the greatest cat of 2023",
                created_at: expect.any(String),
                votes: 0,
                article_img_url: "https://images.pexels.com/photos/97050",
                comment_count: 0
                })
              );
      });
    })
    test('POST: 201 posts an article and responds with the posted article when extra non-existent properties added to the body', () => {
        const article = { 
            author: "rogersop",
            title: "The greatest cat of 2023",
            body: "This article is about the greatest cat of 2023",
            topic: "cats",
            favourite_colour: "pink",
            favourie_day: "Monday"
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(201)
        .then((response) => {
            expect(response.body.article).toEqual(expect.objectContaining({
                article_id: 14,
                title: "The greatest cat of 2023",
                topic: "cats",
                author: "rogersop",
                body: "This article is about the greatest cat of 2023",
                created_at: expect.any(String),
                votes: 0,
                article_img_url: expect.any(String),
                comment_count: 0
                })
              );
      });
    })
    test('POST: 400 sends an appropriate status and error message when given an incomplete body', () => {
        const article = { 
            author: "rogersop",
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request.");
      });
    })
    test('POST: 400 sends an appropriate status and error message when given an empty body', () => {
        const article = { 
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request.");
      });
    })
    test('POST: 400 sends an appropriate status and error message when given an incorrect properties names in the body', () => {
        const article = { 
            invalid_author_name: "rogersop",
            title: "The greatest cat of 2023",
            body: "This article is about the greatest cat of 2023",
            topic: "cats",
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("Bad request.");
      });
    })
    test('POST: 404 sends an appropriate status and error message when given a non-existent author', () => {
        const article = { 
            author: "karolina",
            title: "The greatest cat of 2023",
            body: "This article is about the greatest cat of 2023",
            topic: "cats",
        };
        return request(app)
        .post('/api/articles')
        .send(article)
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe("Not found.");
      });
    })
})

describe('PATCH /api/articles/:article_id', () => {
    test('PATCH: 200 sends an array of an article with updated votes by a positive number', () => {
        return request(app)
        .patch('/api/articles/3')
        .send({ inc_votes: 5 })
        .expect(200)
        .then((response) => {
            expect(response.body.article).toEqual(expect.objectContaining({
                    article_id: 3,
                    title: "Eight pug gifs that remind me of mitch",
                    topic: "mitch",
                    author: "icellusedkars",
                    body: "some gifs",
                    created_at: expect.any(String),
                    votes: 5,
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                })
              );
        })
    })
    test('PATCH: 200 sends an array of an article with updated votes by a negative number', () => {
        return request(app)
        .patch('/api/articles/8')
        .send({ inc_votes: -20 })
        .expect(200)
        .then((response) => {
            expect(response.body.article).toEqual(expect.objectContaining({
                    article_id: 8,
                    title: "Does Mitch predate civilisation?",
                    topic: "mitch",
                    author: "icellusedkars",
                    body: "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
                    created_at: expect.any(String),
                    votes: -20,
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                })
              );
        })
    })
    test('PATCH: 200 sends an array of an article with updated votes by a positive number when sent body with extra keys', () => {
        return request(app)
        .patch('/api/articles/3')
        .send({ 
            inc_votes: 5,
            title: "Does Mitch predate civilisation?"
         })
        .expect(200)
        .then((response) => {
            expect(response.body.article).toEqual(expect.objectContaining({
                    article_id: 3,
                    title: "Eight pug gifs that remind me of mitch",
                    topic: "mitch",
                    author: "icellusedkars",
                    body: "some gifs",
                    created_at: expect.any(String),
                    votes: 5,
                    article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                })
              );
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given an invalid body of the patch (property name)', () => {
        return request(app)
        .patch('/api/articles/8')
        .send({ inc_ves: -20 })
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given an invalid body of the patch (value)', () => {
        return request(app)
        .patch('/api/articles/8')
        .send({ inc_votes: "I am a string" })
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given an invalid article_id', () => {
        return request(app)
        .patch('/api/articles/invalid-id')
        .send({ inc_votes: 30 })
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given a valid but non-existent article_id', () => {
        return request(app)
        .patch('/api/articles/999999999999999999999')
        .send({ inc_votes: 30 })
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not found.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when not given a body of patch', () => {
        return request(app)
        .patch('/api/articles/8')
        .send({})
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
})