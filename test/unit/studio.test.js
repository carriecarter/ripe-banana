const { assert } = require('chai');
//const { getErrors } = require('./helpers');
const Studio = require('../../lib/models/studio');

describe('Studio model', () => {

    it('validates good STUDIO model', () => {
        const data = {
            name: 'Lionsgate',
            address: {
                city: 'Vancouver',
                state: 'BC',
                country: 'Canada'
            }

        };
        const studio = new Studio(data);

        const json = studio.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(studio.validateSync());

    });
});