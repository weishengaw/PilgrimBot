const GetTop = require('../mongoFunctions/GetTop.js');

module.exports = {
    name: 'leaderboard',
    description: 'Get the pilgrims leaderboard!',
    execute(message, args) {
        GetTop.getTop((res) => {
            if (res.error) {
                message.channel.send('Error: could not get pilgrim join count');
                return;
            }
            if (!res) {
                message.channel.send('No data :(');
            }
            if (res) {
                var output = "Top Pilgrims:\n";
                var i = 1;
                for (doc of res) {
                    output = output.concat(i + ". " + doc.nickname + " with " + doc.pilgrim_join_count + " pilgrim joins\n");
                    i++;
                }
                message.channel.send(output);
            }
        })
    },
}