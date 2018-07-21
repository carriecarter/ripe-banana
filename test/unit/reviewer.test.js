const { assert } = require('chai');
//const { getErrors } = require('./helpers');
const Reviewer = require('../../lib/models/reviewer');

describe('Reviewer model', () => {

    it('validates good REVIEWER model', () => {
        const data = {
            name: 'Betty Crocker',
            company: 'Pancake Hut'    
        };
        
        const reviewer = new Reviewer(data);

        const json = reviewer.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(reviewer.validateSync());
    }); 
});