const { MessageEmbed, Permissions } = require("discord.js");
const tempmute = require('./tempmute');
const channelUtils = require('../Libraries/Utils/UChannel');

module.exports = class unmute {
    constructor(){
            this.name = 'unmute',
            this.alias = [],
            this.usage = ``
    }
 
    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            let member = message.guild.members.cache.get(user.id);
            if (!tempmute.isMuted.has(user.id)) return message.channel.send('User is not muted.')
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
                member.roles.remove(role);
                tempmute.isMuted.delete(member.id)

                let UI = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`${user.tag} has been unmuted.`, user.displayAvatarURL())
                    .setDescription(`**Reason:** ${reason}`)
                let Logs = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setAuthor(`[Unmute] ${member.user.tag}`, member.user.displayAvatarURL())
                    .addFields(
                        { name: 'User', value: `<@${user.id}>`, inline: true },
                        { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
                        { name: 'Reason', value: reason, inline: true}
                    )

                    client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })

            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}