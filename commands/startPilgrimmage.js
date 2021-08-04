const Increment = require('../mongoFunctions/Increment.js');
const { pilgrimRoleId, weisCornerId } = require('../config.json');
const events = require('events');

module.exports = {
    name: 'start',
    description: 'Start the pilgrimmage!',
    aliases: ['st'],
    args: 0,
    usage: "<number><unit (s,m,h)>",
    cooldown: 5,
    guildOnly: true,
    execute(message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'pilgrim master' || role.name === 'mod')) return;

        var timer = 0;
        if (args.length === 1 && (/^\d+\D$/i).test(args[0])) {
            if (args[0].endsWith('s')) {
                timer = parseInt(args[0].substring(0, args[0].length - 1)) * 1000;
            } else if (args[0].endsWith('m')) {
                timer = parseInt(args[0].substring(0, args[0].length - 1)) * 60000;
            } else if (args[0].endsWith('h')) {
                timer = parseInt(args[0].substring(0, args[0].length - 1)) * 3600000;
            } else {
                message.channel.send('invalid time suffix, use s, m, or h');
                return;
            }
        } else if (args.length === 1) {
            message.channel.send('invalid usage, use a number followed by s, m, or h');
            return;
        }
        message.channel.send('<@&' + pilgrimRoleId + '>' + ' approx ' + args[0]);

        var startTime = new Date().getTime();
        var fiveminflag = true;
        var oneminflag = true;
        const event = new events.EventEmitter();
        var interval = setInterval(function(){
            if(new Date().getTime() - startTime > timer) {
                clearInterval(interval);
                return;
            }
            if(timer - (new Date().getTime() - startTime) < 300000 && timer > 300000 && fiveminflag) {
                fiveminflag = false;
                message.channel.send('<@&' + pilgrimRoleId + '>' + ' approx 5m');
            }
            if(timer - (new Date().getTime() - startTime) < 60000 && timer > 60000 && oneminflag) {
                oneminflag = false;
                message.channel.send('<@&' + pilgrimRoleId + '>' + ' approx 1m');
            }
        }, 3000)
    },
}