const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { Types } = require('mongoose');
//const Actor = require('../../lib/models/actor');
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

    let foster;

    function saveActor(actor) {
        return request
            .post('/api/actors')
            .send(actor)
            .then(checkOk)
            .then(({ body }) => body);
    }    
    beforeEach(() => {
        return saveActor({ name: 'Jodi Foster' })
            .then(data => {
                foster = data;
            });
    });
    
    beforeEach(() => {
        return save({ 
            title: 'Contact',
            studio: 'Warner Bros.',
            released: 1997,
            cast: [{
                role: 'Dr. Eleanor "Ellie" Arroway',
                actor: foster._id
            }]
        })
            .then(data => {
                film = data;
                console.log('actor thing', data);
            });
    });

    it('saves a film', () => {
        assert.isOk(film._id);
    });

    // it('gets a film by id', () => {
    //     return request
    //         .get(`/api/films/$`)
    // })
});