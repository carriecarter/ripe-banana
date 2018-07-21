const chai = require('chai');
const { assert } = chai;
const Review = require('../../lib/models/review');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose'); 

describe('Review model', () => {
    
    it('validates good model', () => {
        const data = {
            rating: 3,
            reviewer: Types.ObjectId(),
            review: 'the most meh movie EVER. I mean, who eats apples like that anyway? lame.',
            film: Types.ObjectId()
        };
        const review = new Review(data); 

        const json = review.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(review.validateSync());
    });
});