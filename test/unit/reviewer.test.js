const { assert } = require('chai');
// const { getErrors } = require('./helpers');
const Reviewer = require('../../lib/models/reviewer');

describe('Reviewer model', () => {

    it('validates good REVIEWER model', () => {
        const data = {
            email: 'sue@mail.com',
            name: 'Reviewer Sue',
            company: 'Sue Reviews',
            password: 'pass123',
            roles: []    
        };
        
        const reviewer = new Reviewer(data);
        assert.equal(reviewer.email, data.email);
        assert.isUndefined(reviewer.password, 'password should not be set');

        reviewer.generateHash(data.password);
        assert.isDefined(reviewer.hash, 'hash is defined');
        assert.notEqual(reviewer.hash, data.password, 'hash not same as password');

        assert.isUndefined(reviewer.validateSync());

        assert.isTrue(reviewer.comparePassword(data.password), 'compare good password');
        assert.isFalse(reviewer.comparePassword('bad password'), 'compare bad password');

        const json = reviewer.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(reviewer.validateSync());
    }); 

    it('Requires email and hash', () => {
        // check required
    });
});