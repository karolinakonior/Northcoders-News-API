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

describe('DELETE /api/comments/:comment_id', () => {
    test('DELETE: 204 deletes the comment by comment id', () => {
        return request(app)
        .delete('/api/comments/15')
        .expect(204)
    })
    test('DELETE: 404 sends an appropriate status and error message when given a valid but non-existent comment id', () => {
        return request(app)
        .delete('/api/comments/9999999999999999999')
        .expect(404)
        .then(response => {
            expect(response.body.msg).toBe('Not found.');
        })
    })
    test('DELETE: 400 sends an appropriate status and error message when given an invalid comment id', () => {
        return request(app)
        .delete('/api/comments/invalid-id')
        .expect(400)
        .then(response => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    test('POST: 201 posts a comment for an article and responds with the posted comment', () => {
        const comment = { 
            username: 'lurker',
            body: 'Excellent article, well written.'
        };
        return request(app)
        .post('/api/articles/13/comments')
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment).toEqual(expect.objectContaining({
                comment_id: 19,
                body: 'Excellent article, well written.',
                article_id: 13,
                author: 'lurker',
                votes: 0,
                created_at: expect.any(String)
                })
              );
      });
    })
    test('POST: 201 posts a comment for an article and responds with the posted comment', () => {
        const comment = { 
            username: 'lurker',
            body: 'Excellent article, well written.'
        };
        return request(app)
        .post('/api/articles/13/comments')
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment).toEqual(expect.objectContaining({
                body: 'Excellent article, well written.',
                author: 'lurker',
                })
              );
      });
    })
    test('POST: 404 sends an appropriate status and error message when given username that does not exists', () => {
        let comment = { 
            username: 'mitch',
            body: 'Excellent article, well written.'
        };
        return request(app)
        .post('/api/articles/13/comments')
        .send(comment)
        .expect(404)
        .then((response) => {
        expect(response.body.msg).toBe('Not found.');
      });
    });
    test('POST: 400 sends an appropriate status and error message when not given body', () => {
        let comment = { 
            username: 'mitch'
        };
        return request(app)
        .post('/api/articles/13/comments')
        .send(comment)
        .expect(400)
        .then((response) => {
        expect(response.body.msg).toBe('Bad request.');
      });
    })
    test('POST: 404 sends an appropriate status and error message when given a valid but non-existent article id', () => {
        let comment = { 
            username: 'lurker',
            body: 'Excellent article, well written.'
        };
        return request(app)
        .post('/api/articles/13423245355/comments')
        .send(comment)
        .expect(404)
        .then((response) => {
        expect(response.body.msg).toBe('Not found.');
      });
    })
    test('POST: 404 sends an appropriate status and error message when given an invalid article id', () => {
        let comment = { 
            username: 'lurker',
            body: 'Excellent article, well written.'
        };
        return request(app)
        .post('/api/articles/not-in-id/comments')
        .send(comment)
        .expect(400)
        .then((response) => {
        expect(response.body.msg).toBe('Bad request.');
      });
    })
})

describe('PATCH /api/comments/:comment_id', () => {
    test('PATCH: 200 sends an array of a comment with updated votes by a positive number', () => {
        return request(app)
        .patch('/api/comments/2')
        .send({ inc_votes: 7 })
        .expect(200)
        .then(response => {
            expect(response.body.comment).toEqual(expect.objectContaining({
                comment_id: 2,
                body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
                article_id: 1,
                author: 'butter_bridge',
                votes: 21,
                created_at: '2020-10-31T03:03:00.000Z'
            })
          )
        })
    })
    test('PATCH: 200 sends an array of a comment with updated votes by a negative number', () => {
        return request(app)
        .patch('/api/comments/2')
        .send({ inc_votes: -15 })
        .expect(200)
        .then(response => {
            expect(response.body.comment).toEqual(expect.objectContaining({
                comment_id: 2,
                body: 'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
                article_id: 1,
                author: 'butter_bridge',
                votes: -1,
                created_at: '2020-10-31T03:03:00.000Z'
            })
          )
        })
    })
    test('PATCH: 200 sends an array of a comment with updated votes when sent body with extra keys', () => {
        return request(app)
        .patch('/api/comments/18')
        .send({ 
            inc_votes: 4,
            author: 'mitch'
        })
        .expect(200)
        .then(response => {
            expect(response.body.comment).toEqual(expect.objectContaining({
                comment_id: 18,
                body: 'This morning, I showered for nine minutes.',
                article_id: 1,
                author: 'butter_bridge',
                votes: 20,
                created_at: '2020-07-21T00:20:00.000Z'
            })
          )
        })
    })
    test('PATCH: 404 sends an appropriate status and error message when given a non-existent comment id', () => {
        return request(app)
        .patch('/api/comments/19')
        .send({ inc_ves: -20 })
        .expect(404)
        .then((response) => {
            expect(response.text).toBe('Not found.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given an empty body of patch', () => {
        return request(app)
        .patch('/api/comments/18')
        .send({})
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given an incorrect property name in the body of patch', () => {
        return request(app)
        .patch('/api/comments/18')
        .send({ incorrect_name: -20 })
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('PATCH: 400 sends an appropriate status and error message when given an incorrect value of votes in the body of patch', () => {
        return request(app)
        .patch('/api/comments/18')
        .send({ inc_ves: 'Not a number'})
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
})

describe('GET /api/articles/:article_id/comments', () => {
    test('GET: 200 sends an array of all comments of an article', () => {
        return request(app)
        .get('/api/articles/5/comments')
        .expect(200)
        .then(response => {
            expect(response.body.comments).toBeSortedBy('created_at', { descending: true });
            expect(response.body.comments.length).toBe(2);
            response.body.comments.forEach(comment => {
                expect(comment).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number)
                }))
            })
        })
    })
    test('GET: 200 accepts a query of limit and sends an array of selected comments of an article', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=5')
        .expect(200)
        .then(response => {
            expect(response.body.comments).toBeSortedBy('created_at', { descending: true });
            expect(response.body.comments.length).toBe(5);
            response.body.comments.forEach(comment => {
                expect(comment).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number)
                }))
            })
        })
    })
    test('GET: 200 accepts a query of p (page number) and sends an array of selected comments of an article', () => {
        return request(app)
        .get('/api/articles/1/comments?p=2')
        .expect(200)
        .then(response => {
            expect(response.body.comments).toBeSortedBy('created_at', { descending: true });
            expect(response.body.comments.length).toBe(1);
                expect(response.body.comments[0]).toEqual(expect.objectContaining({
                    comment_id: 9,
                    votes: 0,
                    created_at: expect.any(String),
                    author: 'icellusedkars',
                    body: 'Superficially charming',
                    article_id: 1
                }))
            
        })
    })
    test('GET: 200 accepts queries of p (page number) and limit and sends an array of all comments of an article', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=10&p=2')
        .expect(200)
        .then(response => {
            expect(response.body.comments.length).toBe(1);
            expect(response.body.comments[0]).toEqual(expect.objectContaining({
                comment_id: 9,
                votes: 0,
                created_at: expect.any(String),
                author: 'icellusedkars',
                body: 'Superficially charming',
                article_id: 1
                }))
            
        })
    })
    test('GET: 200 accepts queries of p (page number) and limit and sends an array of all comments of an article', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=2&p=6')
        .expect(200)
        .then(response => {
            expect(response.body.comments).toBeSortedBy('created_at', { descending: true });
            expect(response.body.comments.length).toBe(1);
            expect(response.body.comments[0]).toEqual({
                comment_id: 9,
                votes: 0,
                created_at: expect.any(String),
                author: 'icellusedkars',
                body: 'Superficially charming',
                article_id: 1
            })
        })
    })
    test('GET: 200 accepts a limit query and sends an array of all comments of an article if limit is bigger than the comment count', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=30')
        .expect(200)
        .then(response => {
            expect(response.body.comments).toBeSortedBy('created_at', { descending: true });
            expect(response.body.comments.length).toBe(11);
            response.body.comments.forEach(comment => {
                expect(comment).toEqual(expect.objectContaining({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number)
                }))
            })
        })
    })
    test('GET: 200 sends an empty array when a given valid id with no comments associated with it', () => {
        return request(app)
          .get('/api/articles/2/comments')
          .expect(200)
          .then((response) => {
            expect(response.body.comments).toEqual([]);
          });
      });
})

describe('GET /api/articles/:article_id/comments - error handling', () => {
    test('GET: 404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
          .get('/api/articles/999999999999999999999999/comments')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not found.');
          });
    });
    test('GET: 400 sends an appropriate status and error message when given an invalid article id', () => {
        return request(app)
        .get('/api/articles/not-an-id/comments')
        .expect(400)
        .then(response => {
            expect(response.body.msg).toBe('Bad request.');
        })
    })
    test('GET: 404 sends an appropriate status and error message when given page number with no results', () => {
        return request(app)
        .get('/api/articles/1/comments?limit=2&p=20')
        .expect(404)
        .then(response => {
            expect(response.text).toBe('Not found.');
        })
    })
})