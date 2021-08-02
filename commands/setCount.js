const SetCount = require('../mongoFunctions/SetCount.js');

module.exports = {
    name: 'set',
    description: 'Set a pilgrim\'s join count!',
    aliases: [],
    args: 2,
    usage: '<user> <new amount>',
    cooldown: 0,
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;

        if (args.length < 2) {
			return message.channel.send(`You didn't provide enough arguments, ${message.author}!`);
		}

        var filter = args[0];

        if ((!(/^\d+$/).test(args[0]) && !(/^<@!\d+>$/).test(args[0])) || !(/^\d+$/).test(args[1])) {
            return message.channel.send('Invalid command');
        }

        if ((/^<@!\d+>$/).test(args[0])) {
            filter = filter.substring(3, filter.length - 1);
        }
        
        var updatee = message.guild.members.cache.find(member => member.id === filter);
        
        if (!updatee) {
            return message.channel.send('Invalid command');
        }

        var update = args[1];

        opts = {
            userId: filter,
            username: updatee.user.tag,
            nickname: updatee.displayName,
            newCount: update
        }

        SetCount.setCount(opts, (res) => {
            if (res.error) {
                message.channel.send('Error: could not set pilgrim join count');
                return;
            }
            message.channel.send(opts.nickname + ' has joined the pilgrims ' + res.pilgrim_join_count + ' times!');
        });
    },
}