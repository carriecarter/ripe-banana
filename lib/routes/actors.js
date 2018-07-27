const router = require('express').Router();
const Actor = require('../models/actor');
const Film = require('../models/film');
const { HttpError } = require('../util/errors');
const ensureAuth = require('../util/ensure-auth')();
const ensureRole = require('../util/ensure-role')('admin');


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
    })

    
    .get('/:id', (req, res, next) => {
        Promise.all([

            Actor.findById(req.params.id)
                .lean()
                .select('-__v'),
            Film.find({
                'cast.actor': req.params.id
            }, 'title released')
                .lean()
        ])
            .then(([actor, films]) => {
                if(!actor) {
                    next(make404(req.params.id));
                }
                else {
                    actor.films = films;
                    res.json(actor);
                }
            })
            .catch(next);
    })

    .post('/', ensureAuth, ensureRole, (req, res, next) => {
        Actor.create(req.body)
            .then(actor => res.json(actor))
            .catch(next);
    })

    .delete('/:id', ensureAuth, ensureRole, (req, res, next) => {
        Actor.findByIdAndRemove(req.params.id)
            .then(actor => res.json({ removed: !!actor }))
            .catch(next);
    });



    