const db = require('../db/connection');
const { getTopic } = require('../controllers/app.controllers');
const app = require('../app');
const request = require("supertest");
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const fs = require("fs/promises");

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
            expect.objectContaining({
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
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
            let existingPaths = []
            let pathsInJsonFile = []
            let result = true;

            app._router.stack.forEach(function(r){
                if (r.route && r.route.path){
                    existingPaths.push(r.route.path)
                }
              })

            for (const key in response.body) {
                const splittedKey = key.split(' ')
                pathsInJsonFile.push(splittedKey[1])
            }

            for(let element of existingPaths) {
                if (!pathsInJsonFile.includes(element)) {
                   result = false;
                }
             }

            expect(result).toBe(true)
        })
    })
})