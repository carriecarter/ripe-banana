const { assert } = require('chai');
const { getErrors } = require('./helpers');
const Reviewer = require('../../lib/models/reviewer');

// TO DO: Add signup and signin according to Lab.md

describe('Reviewer model', () => {

    it.only('validates good REVIEWER model', () => {
        const data = {
            email: 'sue@mail.com',
            name: 'Reviewer Sue',
            company: 'Sue Reviews',
            password: 'pass123',
            roles: ['admin']    
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
    }); 

    it.skip('validates hash', () => {
        const reviewer = new Reviewer({});
        const errors = getErrors(reviewer.validateSync(), 4);
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.company.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
        
    });
    
});