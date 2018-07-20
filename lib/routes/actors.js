const router = require('express').Router();
const Actor = require('../models/actor');
const { HttpError } = require('../util/errors');

const make404 = id => new HttpError({
    code: 404,
    message: `No Actor With id ${id}`
});

module.exports = router
    .get('/', (req, res, next) => {
        Actor.find()
            .lean()
            .then(actors => res.json(actors))
            .catch(next);
    });

    