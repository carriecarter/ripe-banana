/* eslint no-console: off */
const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { checkOk } = request;

describe('Studios API', () => {

    beforeEach(() => dropCollection('studios'));
    beforeEach(() => dropCollection('films'));

    function saveStudio(studio) {
        return request
            .post('/api/studios')
            .send(studio)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let kittensgate;

    beforeEach(() => {
        return saveStudio({ 
            name: 'Kittensgate',
            address: { 
                city: 'Portland',
                state: 'OR',
                country: 'USA'
            }
        })
            .then(data => {
                kittensgate = data;
            });
    });
    
    let film;
    
    beforeEach(() => {
        return request
            .post('/api/films')
            .send({
                title: 'Glitter',
                studio: kittensgate._id,
                released: 2001
            })
            .then(({ body }) => {
                film = body;
            });
    });
    
    it('saves a studio', () => {
        assert.isOk(kittensgate._id);
    });

    const makeSimple = (studio) => {
        const simple = {
            _id: studio._id,
            name: studio.name
        };
        return simple;
    };
    const makeSimpleTwo = (studio) => { 
        const simple = {
            _id: studio._id,
            name: studio.name,
            address: studio.address
        };

        if(film){
            simple.films = [{
                _id: film._id,
                title: film.title
            }];
        }
        return simple;
    };


    it('gets a studio by id', () => {
        return request
            .get(`/api/studios/${kittensgate._id}`)
            .then(({ body }) => {
                delete body.__v;
                assert.deepEqual(body, makeSimpleTwo(kittensgate));
            });
    });

    it('gets a list of studios', () => {
        let mgm;
        return saveStudio({ name: 'MGM' })
            .then(_mgm => {
                mgm = _mgm;
                return request.get('/api/studios');
            })
            .then(checkOk)
            .then(({ body }) => {
                console.log('body', body);
                assert.deepEqual(body, [makeSimple(kittensgate), makeSimple(mgm)]);

            });
    });

});
// it.skip('deletes a studio', () => {
//     return request
//         .delete(`/api/studios/${lionsgate._id}`)
//         .then(checkOk)
//         .then(res => {
//             assert.deepEqual(res.body, { removed: true });
//             return request.get('/api/studios');
//         })
//         .then(checkOk)
//         .then(({ body }) => {
//             assert.deepEqual(body, []);
//         });

// });