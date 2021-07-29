const Pilgrim = require('../models/Pilgrim.js');

module.exports.getCount = (req, callback) => {
    const filter = { userId: req.userId };
    Pilgrim.findOne(filter)
    .exec((err, obj) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }
        if (obj) {
            callback({ pilgrim_join_count: obj.pilgrim_join_count });
        } else {
            callback({ pilgrim_join_count: 0 });
        }
    })
}