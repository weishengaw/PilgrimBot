const Increment = require('../mongoFunctions/Increment.js');
const { weisCornerId } = require('../config.json');
const events = require('events');

module.exports = {
    name: 'taken',
    description: 'Take da photo!',
    aliases: [],
    args: 0,
    usage: "",
    cooldown: 5,
    guildOnly: true,
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;
        var pilgrims = [];
        const channels = message.guild.channels.cache.filter(c => c.id === weisCornerId);
        const update = async (channels) => {
            for (const [channelID, channel] of channels) {
                for (const [memberID, member] of channel.members) {
                    opts = {
                        userId: memberID,
                        username: member.user.tag,
                        nickname: member.displayName
                    }
                    await new Promise((resolve, reject) => {
                        Increment.increment(opts, (res) => {
                            if (res && res.error) {
                                message.channel.send('Error, not recorded for ' + member.user.username);
                                resolve();
                            } else {
                                pilgrims.push(member.displayName);
                                resolve();
                            }
                        })
                    });
                }
            }
            var data = '';
            for (const pilgrim of pilgrims) {
                data = data + pilgrim + ', ';
            }
            if (data === '') {
                data = 'no one ';
            }
            message.channel.send('Pilgrimmage recorded, ' + data + 'has been recorded in this pilgrimmage');
        };
        update(channels);
    },
}