const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const Actor = require('../../lib/models/actor');
const { checkOk } = request;

describe('Films API', () => {

    beforeEach(() => dropCollection('films'));

    function save(film) {
        return request
            .post('/api/films')
            .send(film)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let film;
    
    beforeEach(() => {
        return save({ 
            title: 'Contact',
            studio: 'Warner Bros.',
            released: 1997,
            cast: [{
                role: 'Dr. Eleanor "Ellie" Arroway',
                actor: Types.ObjectId()
            }]
        })
            .then(data => {
                film = data;
            });
    });

    it('saves a film', () => {
        assert.isOk(film._id);
    });
});