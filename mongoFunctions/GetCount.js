const Pilgrim = require('../models/Pilgrim.js');

module.exports.getCount = (req, res) => {
    const filter = { userId: req };
    Pilgrim.findOne(filter, (err, obj) => {
        if (err) {
            console.log(err);
        } else if (!(typeof(obj.pilgrim_join_count) === 'undefined')) {
            res.send({ count: parseInt(obj.pilgrim_joint_count)});
        } else {
            res.send({ count: 0 });
        }
    });
}