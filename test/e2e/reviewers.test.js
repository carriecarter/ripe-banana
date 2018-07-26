const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const { checkOk } = request;

describe('Reviewers API', () => {

    beforeEach(() => dropCollection('reviewers'));

    function save(reviewer) {
        return request
            .post('/api/reviewers')
            .send(reviewer)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let crocker;
    beforeEach(() => {
        return save({ 
            email: 'betty@crocker.com',
            name: 'Betty Crocker', 
            company: 'Pancake Hut',
            hash: 'abc123',
            roles: ['admin']

        })
            .then(data => {
                crocker = data;
            });
    });

    it.skip('saves a reviewer', () => {
        assert.isOk(crocker._id);
    });
    
    it.skip('gets a reviewer by id', () => {
        return request
            .get(`/api/reviewers/${crocker._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, crocker);
            });
    });

    it.skip('gets a list of reviewers', () => {
        let evans;
        return save({ 
            email: 'evans@crocker.com',
            name: 'Pat Evans', 
            company: 'Pancake Hut',
            hash: 'abc123',
            roles: ['admin'] 
        })
            .then(_evans => {
                evans = _evans;
                return request.get('/api/reviewers');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [crocker, evans]);
            });
    });

    it.skip('deletes a reviewer', () => {
        return request
            .delete(`/api/reviewers/${crocker._id}`)
            .then(checkOk)
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get('/api/reviewers');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });
});