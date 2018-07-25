const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const { checkOk } = request;

// function save(review) {
//     return request
//         .post('/api/reviews')
//         .send(review)
//         .then(checkOk)
//         .then(({ body }) => body);
// }

const makeSimple = (review, film) => {
    const simple = {
        _id: review._id,
        rating: review.rating,
        review: review.review,
        createdAt: review.createdAt
    };

    if(film) {
        simple.film = {
            _id: film._id,
            title: film.title
        };
    }

    return simple;
};

let actorBob;
let studioCool;
let reviewerSue;
let filmAlchemy;
let reviewA;
let reviewB;

const bob = {
    name: 'Actor Bob',
    dob: new Date('1999-01-02'),
    pob: 'NYC'
};

const sue = {
    name: 'Reviewer Sue',
    company: 'NYT'
};

const cool = {
    name: 'Studio Cool',
    address: {
        city: 'LA',
        state: 'CA',
        country: 'United States'
    }
};

describe('Reviews API', () => {

    beforeEach(() => dropCollection('reviews'));
    beforeEach(() => dropCollection('reviewers'));
    beforeEach(() => dropCollection('films'));
    beforeEach(() => dropCollection('actors'));
    beforeEach(() => dropCollection('studios'));



    beforeEach(() => {
        return request  
            .post('/api/actors')
            .send(bob)
            .then(checkOk)
            .then(({ body }) => actorBob = body);
    });

    beforeEach(() => {
        return request  
            .post('/api/studios')
            .send(cool)
            .then(checkOk)
            .then(({ body }) => studioCool = body);
    });

    beforeEach(() => {
        return request  
            .post('/api/reviewers')
            .send(sue)
            .then(checkOk)
            .then(({ body }) => reviewerSue = body);
    });

    beforeEach(() => {
        return saveFilm('films', {
            title: 'Alchemy',
            studio: studioCool._id,
            released: 1999,
            cast: [{
                role: 'Lewis the Dog',
                actor: actorBob._id
            }]
        })
            .then(data => filmAlchemy = data);
    });

    beforeEach(() => {
        return saveReview('review', {
            rating: 3,
            reviewer: reviewerSue._id,
            review: 'all the best doggos are in this',
            film: filmAlchemy._id,
            createdAt: new Date('1999-01-02')
        })
            .then(data => reviewA = data);
    });

    beforeEach(() => {
        return save('review', {
            rating: 1,
            reviewer: reviewerSue._id,
            review: 'well, it was alright.',
            film: filmAlchemy._id,
            createdAt: new Date('1999-01-06')
        })
            .then(data => reviewB = data);
    });

    it('saves a review', () => {
        assert.isOk(reviewA._id);
    }); 
    
    it('gets a list of reviews', () => {
        return request  
            .get('/api/reviews')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [makeSimple(reviewA, filmAlchemy), makeSimple(reviewB, filmAlchemy)]);
            });
    });

});