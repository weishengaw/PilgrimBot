const SetCount = require('../mongoFunctions/SetCount.js');

module.exports = {
    name: 'set',
    description: 'Get a pilgrim\'s join count!',
    execute(message, args) {

        GetCount.getCount({ userId: filter }, (res) => {
            if (res.error) {
                message.channel.send('Error: could not get pilgrim join count');
                return;
            }
            message.channel.send(message.member.displayName + ' has joined the pilgrims ' + res.pilgrim_join_count + ' times!');
        })
    },
}