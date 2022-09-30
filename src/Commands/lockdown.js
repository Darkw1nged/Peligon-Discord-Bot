const { MessageEmbed, Permissions} = require("discord.js");
const locked = []
const lockdownServers = []
const textLocked = []

module.exports = class lockdown {
    constructor(){
        this.name = 'lockdown',
            this.alias = [],
            this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions")

        let channels = client.guilds.cache.get(message.guild.id).channels.cache;
        if (!lockdownServers.includes(message.guild.id)) {
            lockdownServers.push(message.guild.id)
        } else {
            lockdownServers.splice(lockdownServers.indexOf(message.guild.id), 1)
        }

        for (let channel of channels.values()) {
            if (channel.type === 'GUILD_VOICE' || channel.type === 'GUILD_CATEGORY') continue;
            if (!locked.includes(channel.id)) {
                if (channel.permissionOverwrites.cache.get(message.guild.id) && channel.permissionOverwrites.cache.get(message.guild.id).deny.toArray().includes("SEND_MESSAGES")) {
                    textLocked.push(channel.id)
                    continue;
                }
                await channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false})
                locked.push(channel.id)
            } else {
                if (textLocked.includes(channel.id)) continue;
                await channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true})
                locked.splice(locked.indexOf(channel.id), 1)
            }
        }

        if (lockdownServers.includes(message.guild.id)) {

            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`**This server has now been locked!**`)
                .setFooter(`Request By: ${message.author.tag}`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})
        } else {
            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`**This server has now been restored to its normal state!**`)
                .setFooter(`Request By: ${message.author.tag}`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})
        }

    }
}