const Increment = require('../mongoFunctions/Increment.js');

module.exports = {
    name: 'start',
    description: 'Start the pilgrimmage!',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;

        var timer = 0;
        console.log(args);
        console.log((/^\d+\D$/i).test(args[0]));
        if (args.length === 1 && (/^\d+\D$/i).test(args[0])) {
            if (args[0].endsWith('s')) {
                timer = parseInt(args[0].substring(0, args[0].length - 1));
            } else if (args[0].endsWith('m')) {
                timer = parseInt(args[0].substring(0, args[0].length - 1)) * 60;
            } else if (args[0].endsWith('h')) {
                timer = parseInt(args[0].substring(0, args[0].length - 1)) * 3600;
            } else {
                message.channel.send('invalid time suffix, use s, m, or h');
                return;
            }
        } else if (args.length === 1) {
            message.channel.send('invalid usage, type \'-usage\' for more info');
            return;
        }
        setTimeout(() => {
            const channels = message.guild.channels.cache.filter(c => c.id === '474091215768387617');
            for (const [channelID, channel] of channels) {
                for (const [memberID, member] of channel.members) {
                    opts = {
                        userId: memberID,
                        username: member.user.username,
                    }
                    Increment.increment(opts);
                }
            }
            message.channel.send('Pilgrimmage recorded');
        }, timer * 1000);
    },
}