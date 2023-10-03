const db = require('../db/connection');
const { getTopic } = require('../controllers/app.controllers');
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
            expect(response.body.msg).toBe('Path not found');
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
            expect(typeof topic.description).toBe('string');
            expect(typeof topic.slug).toBe('string');
            expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String)
              })
        });
      });
    });
})

describe('GET /api', () => {
    test('GET: 200 send an object describing all the available endpoints on your API', async () => {
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