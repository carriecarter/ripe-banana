const router = require('express').Router();
const Studio = require('../models/studio');
const { HttpError } = require('../util/errors');

module.exports = router 
    .get('/', (req, res, next) => {
        Studio.find()
            .lean()
            .then(studios => res.json(studios))
            .catch(next);
    });