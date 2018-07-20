const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const { checkOk } = request;

describe('Actors API', () => {
    beforeEach(() => dropCollection('actors'));

    function save(actor) {
        return request
            .post('/api/studios')
            .send(actor)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let chuckNorris;
    beforeEach(() => {
        return save({ name: 'Chuck Norris' })
            .then(data => {
                chuckNorris = data;
            });
    });

    it('saves an Actor', () => {
        assert.isOk(chuckNorris._id);
    });

});