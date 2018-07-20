const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const { checkOk } = request;

describe('Studios API', () => {

    beforeEach(() => dropCollection('studios'));

    function save(studio) {
        return request
            .post('/api/studios')
            .send(studio)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let lionsgate;
    beforeEach(() => {
        return save({ name: 'Lionsgate' })
            .then(data => {
                lionsgate = data;
            });
    });

    it('saves a studio', () => {
        assert.isOk(lionsgate._id);
    });

    it('gets a studio by id', () => {
        return request
            .get(`/api/studios/${lionsgate._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, lionsgate);
            });
    });

    it('gets a list of studios', () => {
        let mgm;
        return save({ name: 'MGM' })
            .then(_mgm => {
                mgm = _mgm;
                return request.get('/api/studios');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [lionsgate, mgm]);
            });
    });

    it('deletes a studio', () => {
        return request
            .delete(`/api/studios/${lionsgate._id}`)
            .then(checkOk)
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get('/api/studios');
            })
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });

    });
});