const Pilgrim = require('../models/Pilgrim.js');
const GetCount = require('./GetCount.js');

module.exports.increment = (req, res) => {
    console.log(req);
    const filter = { userId: req.userId };
    var count = 0;
    Pilgrim.findOne(filter)
    .exec((err, obj) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err });
        }

        var update = {};

        if (obj) {
            console.log(obj.pilgrim_join_count);
            count = obj.pilgrim_join_count;
            console.log("count = " + count);
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
                res.status(500).send({ message: "could not update" });
            }
        })
    });
}