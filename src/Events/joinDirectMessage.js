const index = require('../index');

module.exports = async (client) => {

    client.on('guildMemberAdd', async member => {
        if (member.user.bot) return
        let databaseConnection = index.databaseConnection;
        
        databaseConnection.query(`SELECT join_direct_message FROM peligonCoreGuilds WHERE guild_id = ${member.guild.id}`, (err, result) => {
            if (err) throw err;
            if (!result[0]) return

            let message = result[0].join_message.replaceAll('{member}', member)
            member.send(`${message}`)
        });
    })

}