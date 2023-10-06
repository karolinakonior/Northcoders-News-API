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

describe('GET /api/users', () => {
    test('GET: 200 sends an array of all users to the client', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(response => {
            response.body.users.forEach(user => {
                expect(user).toEqual(expect.objectContaining({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                    })
                  );
            })
            expect(response.body.users).toHaveLength(4);
            expect(typeof response.body.users).toBe('object');
        })
    })
})

describe('GET /api/users/:username', () => {
    test('GET 200: sends an array of selected user', () => {
        return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(response => {
            expect(response.body.user).toEqual(expect.objectContaining({
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
            }))
        })
    })
    test('GET 404: sends an appropriate status and error message when given non-existent user', () => {
        return request(app)
        .get('/api/users/butter')
        .expect(404)
        .then(response => {
            expect(response.text).toBe('Not found.');
        })
    })
})