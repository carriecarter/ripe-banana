const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const { checkOk } = request;

describe('Reviews API', () => {
    
    beforeEach(() => dropCollection('reviews'));

    function save(review) {
        return request  
            .post('/api/reviews')
            .send(review)
            .then(checkOK)
            .then(({ body }) => body);
    }

    let joe;
    beforeEach(() => {
        return save({
            name: 'Joe Schmo',
            company: 'reviewsRus'
        })
            .then(data => {
                joe = data;
            });
    });

    it()

});