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

describe('Invalid path - error handling', () => {
    test('404 - sends appropriate message when path entered by a client does not exists', () => {
        return request(app)
        .get('/api/tresdgtriwjpic')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Path not found.');
        })
    })
})


describe('GET /api/topics', () => {
    test('GET:200 sends an array of topics to the client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(response.body.topics.length).toBe(3);
            response.body.topics.forEach((topic) => {
            expect(topic).toEqual(expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String)
              }))
        });
      });
    });
})

describe('GET /api', () => {
    test('GET: 200 sends an object describing all the available endpoints on your API', async () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const stringResponse = JSON.stringify(response.body)
            const parsedBody = JSON.parse(stringResponse)

            let existingPaths = []
            let pathsInJsonFile = []
            let result = true;

            app._router.stack.forEach(function(r){
                if (r.route && r.route.path){
                    existingPaths.push(r.route.path)
                }
              })

            for (const key in parsedBody) {
                const pathInParsedBody = key.split(' ')
                pathsInJsonFile.push(pathInParsedBody[1])
            }

            for(let element of existingPaths) {

                if (!pathsInJsonFile.includes(element)) {
                   result = false;
                }
             }

            expect(typeof parsedBody).toBe('object')
            expect(result).toBe(true)
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


describe('GET /api/articles', () => {
    test('GET: 200 sends and array of articles to the client sorted by date in descending order', () => {
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

describe('POST /api/articles/:article_id/comments', () => {
    test('POST: 201 posts a comment for an article and responds with the posted comment', () => {

        let comment = { 
            username: 'lurker',
            body: 'Excellent article, well written.'
        };

        return request(app)
        .post('/api/articles/13/comments')
        .send(comment)
        .expect(201)
        .then((response) => {
        expect(response.body.comment.author).toBe('lurker');
        expect(response.body.comment.body).toBe('Excellent article, well written.');
      });
    })
})