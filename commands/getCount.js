const GetCount = require('../mongoFunctions/GetCount.js');

module.exports = {
    name: 'get',
    description: 'Get a pilgrim\'s join count!',
    execute(message, args) {
        var filter = message.member.id;

        GetCount.getCount({ userId: filter }, (res) => {
            if (res.error) {
                message.channel.send('Error: could not get pilgrim join count');
                return;
            }
            message.channel.send(message.member.user.username + ' has joined the pilgrims ' + res.pilgrim_join_count + ' times!');
        })
    },
}