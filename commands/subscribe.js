const GetCount = require('../mongoFunctions/GetCount.js');

module.exports = {
    name: 'subscribe',
    description: 'Subscribe to the pilgrims!',
    aliases: ['join', 'su'],
    args: 0,
    usage: '',
    cooldown: 5,
    execute(message, args) {
        var filter = message.member.id;

        GetCount.getCount({ userId: filter }, (res) => {
            if (res.error) {
                message.channel.send('Error: could not get pilgrim join count');
                return;
            }
            var role = message.member.guild.roles.cache.find(role => role.name === "pilgrims");
            if (message.member.roles.cache.find(role => role.name === "pilgrims")) {
                message.channel.send('You\'re already in the pilgrimmage!');
            } else if (res.pilgrim_join_count >= 5) {
                message.member.roles.add(role);
                message.channel.send('You\'ve joined the pilgrimmage!');
            } else {
                message.channel.send('You need ' + (5 - res.pilgrim_join_count) + ' more joins to join the pilgrimmage')
            }
        })
    },
}