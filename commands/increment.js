const GetCount = require('../mongoFunctions/GetCount.js');
const SetCount = require('../mongoFunctions/SetCount.js');

module.exports = {
    name: 'increment',
    description: 'Increment a pilgrim\'s join count by an amount!',
    aliases: ['inc'],
    args: 2,
    usage: '<target> <amount>',
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
            return message.channel.send('That is not a valid id');
        }

        var update = 0;
        const getPrevCount = async (id) => {
            await new Promise((resolve, reject) => {
                GetCount.getCount({ userId: id }, (res) => {
                    if (!res.error) {
                        update = res.pilgrim_join_count + parseInt(args[1]);
                        resolve();
                    }
                    resolve();
                });
            });
        }

        getPrevCount(filter).then((res) => {
            opts = {
                userId: filter,
                username: updatee.user.tag,
                nickname: updatee.displayName,
                newCount: update
            };

            SetCount.setCount(opts, (res) => {
                if (res.error) {
                    message.channel.send('Error: could not set pilgrim join count');
                    return;
                }
                message.channel.send(opts.nickname + ' has joined the pilgrims ' + res.pilgrim_join_count + ' times!');
            });
        });
    },
};