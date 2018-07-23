const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { checkOk } = request;


// describe('Reviews API', () => {

//     beforeEach(() => dropCollection('reviews'));


//     function save(review) {
//         return request  
//             .post('/api/reviews')
//             .send(review)
//             .then(checkOK)
//             .then(({ body }) => body);
//     }

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


    beforeEach(() => dropCollection('reviews'));


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
            reviewer: 'Joe',
            review: 'this is joes first review of a movie',
            film: 'Joe Movie'
        })
            .then(data => {
                joe = data;
            });
    });

    it('saves a review', () => {
        assert.isOk(joe._id);
    });


// });