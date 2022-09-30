const { MessageEmbed, Permissions } = require('discord.js');
const databaseUtils = require('../Libraries/Utils/UDatabase');
const channelUtils = require('../Libraries/Utils/UChannel');
const isMuted = new Set();

module.exports = class tempmute {
    constructor(){
            this.name = 'tempmute',
            this.alias = [],
            this.usage = ``
    }
 
    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        if (user) {
            if (user === message.author) return message.channel.send('You can not mute yourself.')
            let member = message.guild.members.cache.get(user.id);
            if (isMuted.has(member.id)) return message.channel.send('User is already muted.')
            if (member) {
                let time = args[2];
                if (!time) time = 60 * 60 * 1000;
                let time_format = "";

                if (time.includes("s")) {
                    time = time.replaceAll("s", "")
                    time = time * 1000;
                    time_format = "second(s)"
                } else if (time.includes("m")) {
                    time = time.replaceAll("m", "")
                    time = time * 60 * 1000;
                    time_format = "minute(s)"
                } else if (time.includes("h")) {
                    time = time.replaceAll("h", "")
                    time = time * 60 * 60 * 1000;
                    time_format = "hour(s)"
                } else if (time.includes("d")) {
                    time = time.replaceAll("d", "")
                    time = time * 60 * 60 * 24 * 1000;
                    time_format = "day(s)"
                } else if (time.includes("w")) {
                    time = time.replaceAll("w", "")
                    time = time * 60 * 60 * 24 * 7 * 1000;
                    time_format = "week(s)"
                } else if (time.includes("mth") || time.includes("mths")) {
                    time = time.replaceAll("mth", "").replaceAll("mths", "")
                    time = time * 60 * 60 * 24 * 7 * 4 * 1000;
                    time_format = "month(s)"
                } else if (time.includes("y")) {
                    time = time.replaceAll("y", "")
                    time = time * 60 * 60 * 24 * 7 * 52 * 1000;
                    time_format = "year(s)"
                } else time = 60 * 60 * 1000;
                let reason = args.slice(3).join(' ');
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

                let UI = new MessageEmbed()
                    .setColor(0xCD3333)
                    .setDescription(`**Reason:** ${reason}`)
                    .setAuthor(`${user.tag} has been temporarily muted`, user.displayAvatarURL())
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
                    .setDescription(`You were muted for ${time} ${time_format} from ${message.guild.name} Discord for: **${reason}**`)

                    client.channels.cache.get(await channelUtils.getLogsChannel(message.guild)).send({embeds: [Logs] })
                message.channel.send({embeds: [UI] })
                try {
                    user.send({embeds: [Mute] })
                } catch (err) { console.log(err) }

                isMuted.add(member.id);
                setTimeout(() => {
                    member.roles.remove(role)
                    isMuted.delete(member.id)
                }, time);

            } else { message.channel.send('Could not find that user.') }
        } else { message.channel.send('User not found.') }

    }
}

module.exports.isMuted = isMuted;