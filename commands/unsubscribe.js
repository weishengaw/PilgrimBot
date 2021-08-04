module.exports = {
    name: 'unsubscribe',
    description: 'Unsubscribe to the pilgrims!',
    aliases: ['quit','us'],
    args: 0,
    usage: '',
    cooldown: 5,
    execute(message, args) {
        var role = message.member.guild.roles.cache.find(role => role.name === "pilgrims");
        if (!message.member.roles.cache.find(role => role.name === "pilgrims")) {
            message.channel.send('You\'re already not in the pilgrimmage :(');
        } else {
            message.member.roles.remove(role);
            message.channel.send('You\'ve left the pilgrimmage :(');
        }
    },
}