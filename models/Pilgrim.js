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
    username: {
        type: String,
        default: ""
    }
});

const Pilgrim = mongoose.model('Pilgrim', PilgrimSchema);
module.exports = Pilgrim;