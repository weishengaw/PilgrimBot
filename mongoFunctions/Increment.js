const Pilgrim = require('../models/Pilgrim.js');
const GetCount = require('./GetCount.js');
const SetCount = require('./SetCount.js');

module.exports.increment = (req, callback) => {
    var opts = {
        userId: req.userId
    }

    const filter = { userId: req.userId };

    GetCount.getCount(filter, (res) => {
        if (res.error) {
            callback({ error: res.error });
        }

        opts = {
            userId: req.userId,
            username: req.username,
            nickname: req.nickname,
            newCount: res.pilgrim_join_count + 1
        }

        SetCount.setCount(opts, (res2) => {
            if (res2.error) {
                callback({ error: res2.error });
            } else {
                callback(res2);
            }
        });
    });   
}
