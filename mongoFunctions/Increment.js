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

        var update = {};

        if (obj) {
            count = obj.pilgrim_join_count;
            update = { pilgrim_join_count: count + 1};
        } else {
            update = { pilgrim_join_count: 1, username: req.username }
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
