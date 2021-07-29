const Pilgrim = require('../models/Pilgrim.js');
const GetCount = require('./GetCount.js');

module.exports.increment = (req, callback) => {
    const filter = { userId: req.userId };
    var count = 0;
    Pilgrim.findOne(filter)
    .exec((err, obj) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }

        if (obj) {
            count = obj.pilgrim_join_count;
        } else {
            count = 0
        }

        const update = {
            pilgrim_join_count: count + 1,
            username: req.username,
            nickname: req.nickname
        }

        const opts = {
            upsert: true,
        };

        Pilgrim.findOneAndUpdate(filter, update, opts, (err, doc) => {
            if (err) {
                console.log(err);
                callback({ err: err });
            }
            callback(doc);
        })
    });
}
