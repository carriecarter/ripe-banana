const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const { checkOk } = request;

describe('Actors API', () => {
    beforeEach(() => dropCollection('actors'));

    function save(actor) {
        return request
            .post('/api/actors')
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

    it('gets an actor by id', () => {
        return request
            .get(`/api/actors/${chuckNorris._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, chuckNorris);
            });
    });

    it('gets a list of actors', () => {
        let billMurray;
        return save({ name: 'Bill Murray' })
            .then(_billMurray => {
                billMurray = _billMurray;
                return request.get('/api/actors');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [chuckNorris, billMurray]);
            });
    });



});