const Pilgrim = require('../models/Pilgrim.js');

module.exports.setCount = (req, callback) => {
    const filter = { userId: req.userId };
    const update = { pilgrim_join_count: req.newCount };
    Pilgrim.findOneAndUpdate(filter, update)
    .exec((err, obj) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }
    })
}