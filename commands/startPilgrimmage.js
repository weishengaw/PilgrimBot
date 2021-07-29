const Increment = require('../mongoFunctions/Increment.js');
const { pilgrimRoleId, weisCornerId } = require('../config.json');

module.exports = {
    name: 'start',
    description: 'Start the pilgrimmage!',
    guildOnly: true,
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;

        var timer = 0;
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
            message.channel.send('invalid usage, use a number followed by s, m, or h');
            return;
        }
        message.channel.send('<@&' + pilgrimRoleId + '>');
        setTimeout(() => {
            const channels = message.guild.channels.cache.filter(c => c.id === weisCornerId);
            for (const [channelID, channel] of channels) {
                for (const [memberID, member] of channel.members) {
                    opts = {
                        userId: memberID,
                        username: member.user.tag,
                        nickname: member.displayName
                    }
                    Increment.increment(opts, (res) => {
                        if (res && res.error) {
                            message.channel.send('Error, not recorded for ' + member.user.username);
                        }
                    })
                }
            }
            message.channel.send('Pilgrimmage recorded');
        }, timer * 1000);
    },
}