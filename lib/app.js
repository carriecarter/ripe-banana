const express = require('express');
const app = express();
const morgan = require('morgan');

//middleware
app.use(morgan('dev'));
app.use(express.json());

//routes
const ensureAuth = require('./util/ensure-auth')();

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const studios = require('./routes/studios');
app.use('/api/studios', studios);

const actors = require('./routes/actors');
app.use('/api/actors', actors);

const reviewers = require('./routes/reviewers');
app.use('/api/reviewers', reviewers);

const films = require('./routes/films');
app.use('/api/films', films);

const reviews = require('./routes/reviews');
app.use('/api/reviews', reviews);



const { handler, api404 } = require('./util/errors');

app.use('/api', api404);
app.use((req, res) => {
    res.sendStatus(404);
});

//eslint-disable-next-line
app.use(handler);

module.exports = app; 
