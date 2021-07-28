const mongoose = require('mongoose');

const PilgrimSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    pilgrim_join_count: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Pilgrim = mongoose.model('Pilgrim', PilgrimSchema);
module.exports = Pilgrim;