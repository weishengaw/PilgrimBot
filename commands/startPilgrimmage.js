const Increment = require('../mongoFunctions/Increment.js');

module.exports = {
    name: 'start',
    description: 'Start the pilgrimmage!',
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;

        var timer = 0;
        if (args.length === 1 && args[0].matches("\d\d\D")) {
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
        }
        setTimeout(() => {
            const channels = message.guild.channels.cache.filter(c => c.id === '474091215768387617');
            for (const [channelID, channel] of channels) {
                for (const [memberID, member] of channel.members) {
                    Increment.increment(memberID);
                }
            }
        }, timer * 1000);
        message.channel.send('Pilgrimmage recorded');
    },
}