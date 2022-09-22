const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/databaseUtils');
const channelUtils = require('../Libraries/Utils/channelUtls');

module.exports = class kick {
    constructor(){
            this.name = 'kick',
            this.alias = [],
            this.usage = ``
    }
 
    async run(client, message, args, user) {

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            if (user === message.author) return message.channel.send('You can not kick yourself.')
            let member = message.guild.members.cache.get(user.id);
            let client_user = message.guild.members.cache.get(client.user.id);
            if (member) {
                let reason = args.slice(2).join(' ');
                if (!reason) reason = "No reason provided.";
                if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
                    member.roles.cache.at(0).rawPosition >= client_user.roles.cache.at(0).rawPosition)
                    return message.channel.send("I can't do that because my highest role is too low in the hierarchy.")

                await databaseUtils.incrementInfractions(message.guild, user);

                let UI = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`**Reason:** ${reason}`)
                    .setAuthor(`${user.tag} has been kicked`, user.displayAvatarURL())

                let Logs = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`[Kick] ${user.tag}`, user.displayAvatarURL())
                    .addFields(
                        { name: 'User', value: `<@${user.id}>`, inline: true },
                        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Reason', value: reason, inline: true }
                    )
                let kick = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`You were kicked from **${message.guild.name}** Discord for: **${reason}**`)

                    client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })
                try {
                    user.send({embeds: [kick] })
                } catch (Exception) { }
                await member.kick()


            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}