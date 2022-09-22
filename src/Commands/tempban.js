const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/databaseUtils');
const channelUtils = require('../Libraries/Utils/channelUtls');
const isBanned = new Set();

module.exports = class tempban {
    constructor(){
        this.name = 'tempban',
            this.alias = [],
            this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            if (user === message.author) return message.channel.send('You can not mute yourself.')
            let member = message.guild.members.cache.get(user.id);
            if (isBanned.has(member.id)) return message.channel.send('User is already banned.')
            if (member) {
                let time = args[2];
                if (!time) time = 60;
                let reason = args.slice(3).join(' ');
                if (!reason) reason = "No reason provided.";

                await databaseUtils.incrementInfractions(message.guild, user);

                let UI = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`**Reason:** ${reason}`)
                    .setAuthor(`${user.tag} has been temporarily banned`, user.displayAvatarURL())
                let Logs = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`[Ban] ${user.tag}`, user.displayAvatarURL())
                    .addFields(
                        { name: 'User', value: `<@${user.id}>`, inline: true },
                        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Reason', value: reason, inline: true}
                    )
                let Ban = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`You were banned for ${time} minutes from ${message.guild.name} Discord for: **${reason}**`)

                    client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })
                try {
                    user.send({embeds: [Ban] })
                } catch (err) { console.log(err) }

                isBanned.add(member.id);
                await member.ban({ reason: reason})
                setTimeout(() => {
                    isBanned.delete(member.id);
                    message.guild.members.unban(member)
                }, time * 60 * 1000);

            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}