const { assert } = require('chai');
const { getErrors } = require('./helpers');
const Film = require('../../lib/models/film');

describe('Film model', () => {

    it('validates a dope model', () => {
        const data = {
        
            name: 'Contact',
            studio: 'Warner Bros.',
            released: 1997,
            cast: [{
                role: 'Dr. Eleanor "Ellie" Arroway',
                actor: 'Jodie Foster ***Schema.Types.ObjectId',  
            }, {
                role: 'Palmer Joss',
                actor: 'Matthew McConaughey ***Schema.Types.ObjectId'
            }]
        };
        const film = new Film(data);

        const json = film.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(film.validateSync());

    });
});