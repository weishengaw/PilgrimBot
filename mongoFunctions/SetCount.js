const Pilgrim = require('../models/Pilgrim.js');

module.exports.setCount = (req, callback) => {
    const filter = { userId: req.userId };
    const update = { 
        pilgrim_join_count: req.newCount,
        username: req.username,
        nickname: req.nickname
    };
    const opts = {
        upsert: true,
        returnOriginal: false
    };

    Pilgrim.findOneAndUpdate(filter, update, opts)
    .exec()
    .then((obj) => {
        if (obj) {
            callback({ pilgrim_join_count: obj.pilgrim_join_count });
        } else {
            callback({ pilgrim_join_count: req.newCount });
        }
    })
    .catch((err) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }
    });
}