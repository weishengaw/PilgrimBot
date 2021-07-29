const Pilgrim = require('../models/Pilgrim.js');

module.exports.getTop = (callback) => {
    Pilgrim.find()
    .sort({ pilgrim_join_count : -1 })
    .limit(3)
    .exec((err, obj) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }
        if (obj) {
            callback(obj);
        } else {
            callback(null);
        }
    })
}