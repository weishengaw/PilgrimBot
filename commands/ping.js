module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        console.log(args.length);
		message.channel.send('Pong.');
	},
};