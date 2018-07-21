const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    studio: {
        type: Schema.Types.ObjectId,
        required: true
    },
    released: {
        type: Number,
        required: true,
        min: 4,
        max: 4
    },
    cast: [{
        role: String,
        actor: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }]
});

module.exports = mongoose.model('Film', schema);

