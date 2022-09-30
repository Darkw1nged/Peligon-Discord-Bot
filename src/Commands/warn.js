const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/UDatabase');
const channelUtils = require('../Libraries/Utils/UChannel');

module.exports = class warn {
    constructor(){
            this.name = 'warn',
            this.alias = [],
            this.usage = ``
    }
 
    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            if (user === message.author) return message.channel.send('You can not warn yourself.')
            let member = message.guild.members.cache.get(user.id);
            if (member) {
                let reason = args.slice(2).join(' ');
                if (!reason) reason = "No reason provided.";
                await databaseUtils.incrementInfractions(message.guild, user);

                let UI = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`**Reason:** ${reason}`)
                    .setAuthor(`${user.tag} has been warned`, user.displayAvatarURL())
                let Logs = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`[Warn] ${user.tag}`, user.displayAvatarURL())
                    .addFields(
                        { name: 'User', value: `<@${user.id}>`, inline: true },
                        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Reason', value: reason, inline: true }
                    )
                let warn = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`You were warned in **${message.guild.name}** Discord for: **${reason}**`)

                    client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })
                try {
                    user.send({embeds: [warn] })
                } catch (Exception) { }


            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}