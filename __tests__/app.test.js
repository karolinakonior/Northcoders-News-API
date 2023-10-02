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
    return db.end
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
        });
      });
    });
})