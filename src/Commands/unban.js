const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/UDatabase');
const channelUtils = require('../Libraries/Utils/UChannel');

module.exports = class unban {
    constructor() {
        this.name = 'unban',
            this.alias = ['pardon'],
            this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (args.length < 2) return message.channel.send("User not found.")
        let reason = args.slice(2).join(' ');
        if (!reason) reason = "No reason provided.";

        let member = args[1];
        if (user) {
            await message.guild.members.unban(user)
            sendMessage(client, logsChannel, message, member, reason)

        } else if (member.includes("#")) {
            message.guild.bans.fetch().then(banned => {
                banned.map(bannedMember => bannedMember.user.tag).forEach(fetched_member => {
                    let banned_member = client.users.cache.find(user => user.tag === fetched_member)
                    if (banned_member.tag === member) {
                        message.guild.members.unban(banned_member)
                        member = banned_member;
                        sendMessage(client, logsChannel, message, member, reason)
                    }
                })
            });
        } else if (!isNaN(member)) {
            message.guild.bans.fetch().then(banned => {
                banned.map(bannedMember => bannedMember.user.tag).forEach(fetched_member => {
                    let banned_member = client.users.cache.find(user => user.tag === fetched_member)
                    if (banned_member.id === member) {
                        message.guild.members.unban(banned_member)
                        member = banned_member;
                        sendMessage(client, logsChannel, message, member, reason)
                    }
                })
            });
        } else return message.channel.send("That user could not be found.\nIf you believe this is an error. **Try using their user ID!**")

    }
}
async function sendMessage(client, logsChannel, message, member, reason) {

    let UI = new MessageEmbed()
        .setColor(0xCD3333)
        .setAuthor(`${member.tag} has been unbanned`, member.displayAvatarURL())
    let Logs = new MessageEmbed()
        .setColor(0xCD3333)
        .setAuthor(`[Unban] ${member.tag}`, member.displayAvatarURL())
        .addFields(
            { name: 'User', value: `<@${member.id}>`, inline: true },
            { name: 'Moderator', value: `<@${message.author.id}>`, inline: true },
            { name: 'Reason', value: reason, inline: true }
        )
        client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
    message.channel.send({embeds: [UI] })

}