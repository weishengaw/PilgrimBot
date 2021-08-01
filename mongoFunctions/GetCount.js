const Pilgrim = require('../models/Pilgrim.js');

module.exports.getCount = (req, callback) => {
    const filter = { userId: req.userId };
    Pilgrim.findOne(filter)
    .exec()
    .then((obj) => {
        if (obj) {
            callback && callback({ pilgrim_join_count: obj.pilgrim_join_count });
        } else {
            callback && callback({ pilgrim_join_count: 0 });
        }
    })
    .catch((err) => {
        if (err) {
            console.log(err);
            callback && callback({ error: err });
        }
    });
}