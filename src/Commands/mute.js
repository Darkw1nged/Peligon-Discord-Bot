const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/databaseUtils');
const channelUtils = require('../Libraries/Utils/channelUtls');
const isMuted = new Set();

module.exports = class mute {
    constructor(){
        this.name = 'mute',
            this.alias = [],
            this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            if (user === message.author) return message.channel.send('You can not mute yourself.')
            let member = message.guild.members.cache.get(user.id);
            if (isMuted.has(user.id)) return message.channel.send('User is already muted.')
            if (member) {
                let reason = args.slice(2).join(' ');
                if (!reason) reason = "No reason provided.";

                let role = message.guild.roles.cache.find(r => r.name === "Muted");
                if (role === undefined) {
                    message.guild.roles.create({
                        name: "Muted",
                        reason: 'No muted role found.'
                    })
                }
                member.roles.add(role)

                await databaseUtils.incrementInfractions(message.guild, user);
                isMuted.add(user.id)

                let UI = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`**Reason:** ${reason}`)
                    .setAuthor(`${user.tag} has been muted`, user.displayAvatarURL())
                let Logs = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`[Muted] ${user.tag}`, user.displayAvatarURL())
                    .addFields(
                        { name: 'User', value: `<@${user.id}>`, inline: true },
                        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Reason', value: reason, inline: true}
                    )
                let Mute = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`You were muted from ${message.guild.name} Discord for: **${reason}**`)

                    client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })
                try {
                    user.send({embeds: [Mute] })
                } catch (err) { console.log(err) }

            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}