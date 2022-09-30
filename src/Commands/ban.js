const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/UDatabase');
const channelUtils = require('../Libraries/Utils/UChannel');

module.exports = class ban {
    constructor(){
            this.name = 'ban',
            this.alias = [],
            this.usage = ``
    }
 
    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            if (user === message.author) return message.channel.send('You can not ban yourself.')
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
                    .setAuthor(`${member.user.tag} has been banned`, member.user.displayAvatarURL())

                let Logs = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`[Ban] ${member.user.tag}`, member.user.displayAvatarURL())
                    .addFields(
                        { name: 'User', value: `<@${user.id}>`, inline: true },
                        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Reason', value: reason, inline: true }
                    )

                let Ban = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`You were banned from **${message.guild.name}** Discord for: **${reason}**`)

                client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })
                try {
                    user.send({embeds: [Ban] })
                } catch (err) { console.log(err) }
                await member.ban()


            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}