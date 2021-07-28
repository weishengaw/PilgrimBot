const Pilgrim = require('../models/Pilgrim.js');
const GetCount = require('./GetCount.js');

module.exports.increment = (req, res) => {
    const filter = { userId: req };
    var count = 0;
    Pilgrim.findOne(filter, (err, obj) => {
        if (err) {
            console.log(err);
        } else if (!(typeof(obj) === 'undefined') && !(typeof(obj.pilgrim_join_count) === 'undefined')) {
            count = obj.pilgrim_joint_count;
            console.log(count);
        } else {
            count = 0;
        }
    });

    const update = { pilgrim_join_count: count + 1};
    console.log(update);


    const opts = {
        upsert: true,
    };

    Pilgrim.findOneAndUpdate(filter, update, opts, (err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "could not update" });
        } else {
            console.log(doc);
        }
    })
}