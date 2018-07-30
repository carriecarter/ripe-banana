const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const schema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    roles: [String]
});

schema.methods.generateHash = function(password) {
    this.has = bcrypt.hashSync(password, 4);
};

schema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('Reviewer', schema);