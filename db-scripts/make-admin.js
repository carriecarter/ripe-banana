require('dotenv').config();
const connect = require('../lib/util/connect');
const Reviewer = require('../lib/models/reviewer');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ripe-banana';
connect(MONGODB_URI);

Reviewer.findByIdAndUpdate(
    'abc123',
    { 
        $addToSet: { 
            roles: 'admin'
        }
    }
)
    .catch(console.log)
    .then(() => mongoose.connection.close());
