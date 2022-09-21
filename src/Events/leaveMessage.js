module.exports = async (client) => {

    const index = require('../index');

    client.on('guildMemberRemove', async member => {
        if (member.user.bot) return
        let databaseConnection = index.databaseConnection;

        databaseConnection.query(`SELECT leave_message FROM peligonCoreGuilds WHERE guild_id = ${member.guild.id}`, (err, result) => {
            if (err) throw err;
            if (!result[0]) return

            let message = result[0].leave_message.replaceAll('{member}', member)
            let channel = member.guild.channels.cache.find(channel => channel.id === "974454352863449118")
            if (!channel) return

            channel.send(message)
        });
    })

}