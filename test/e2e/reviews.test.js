const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { checkOk } = request;


describe('Reviews API', () => {

    beforeEach(() => dropCollection('reviews'));
    beforeEach(() => dropCollection('reviewers'));
    beforeEach(() => dropCollection('films'));

    function save(reviewer) {
        return request
            .post('/api/reviewers')
            .send(reviewer)
            .then(checkOk)
            .then(({ body }) => body);
    }

    function save(film) {
        return request
            .post('/api/films')
            .send(film)
            .then(checkOk)
            
    }

    let reviewer;
    let film;

    function save(review) {
        return request  
            .post('/api/reviews')
            .send(review)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let joe;
    beforeEach(() => {
        return save({
            rating: 3,
            reviewer: 'Joe Schmo',
            review: 'this is joes first review of a movie',
            film: 'Joe Dirt'
        })
            .then(data => {
                joe = data;
            });
    });

    it('saves a review', () => {
        assert.isOk(joe._id);
    });
});