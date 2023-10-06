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

describe('POST /api/topics', () => {
    test('POST: 201 posts a topic and responds with posted topic', () => {
        const topic = {
            "slug": "cars",
            "description": "everything about cars"
        }
        return request(app)
        .post('/api/topics')
        .send(topic)
        .expect(201)
        .then(response => {
            expect(response.body.topic).toEqual(expect.objectContaining({
                "slug": "cars",
                "description": "everything about cars"
                })
              );
        })
    })
    test('POST: 201 posts a topic with omitted description and responds with posted topic', () => {
        const topic = {
            "slug": "cars"
        }
        return request(app)
        .post('/api/topics')
        .send(topic)
        .expect(201)
        .then(response => {
            expect(response.body.topic).toEqual(expect.objectContaining({
                "slug": "cars"
                })
              );
        })
    })
    test('POST: 201 posts a topic when given extra keys in the body and responds with posted topic', () => {
        const topic = {
            "slug": "cars",
            "description": "everything about cars",
            "author": "karolina"
        }
        return request(app)
        .post('/api/topics')
        .send(topic)
        .expect(201)
        .then(response => {
            expect(response.body.topic).toEqual(expect.objectContaining({
                "slug": "cars",
                "description": "everything about cars"
                })
              );
        })
    })
    test('POST: 400 sends an appropriate status and error message when not given slug', () => {
        const topic = {
            "description": "everything about cars"
        }
        return request(app)
        .post('/api/topics')
        .send(topic)
        .expect(400)
        .then(response => {
            expect(response.body.msg).toBe("Bad request.");
        })
    })
    test('POST: 400 sends an appropriate status and error message when given empty body', () => {
        const topic = {}
        return request(app)
        .post('/api/topics')
        .send(topic)
        .expect(400)
        .then(response => {
            expect(response.body.msg).toBe("Bad request.");
        })
    })
})