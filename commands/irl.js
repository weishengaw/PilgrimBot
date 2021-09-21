const Increment = require('../mongoFunctions/Increment.js');

module.exports = {
    name: 'irl',
    description: 'Irl photo!',
    aliases: [],
    args: 0,
    usage: "",
    cooldown: 0,
    guildOnly: true,
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;
        var pilgrims = [];
        const update = async () => {
                for (const joiner of args) {
                    if ((/^<@!\d+>$/).test(joiner)) {
                        filter = joiner.substring(3, joiner.length - 1);
                        var updatee = message.guild.members.cache.find(member => member.id === filter);

                        if (!updatee) {
                            message.channel.send('That is not a valid id');
                        } else {
                            opts = {
                                userId: filter,
                                username: updatee.user.tag,
                                nickname: updatee.user.displayName
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
        update();
    },
}