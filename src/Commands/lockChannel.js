const { MessageEmbed, Permissions} = require("../../node_modules/discord.js/src/index");
const locked = []

module.exports = class lock {
    constructor(){
        this.name = 'lock',
        this.alias = [],
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions")

        if (!locked.includes(message.channel.id)) {
            await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false})

            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`**This channel now has been locked!**`)
                .setFooter(`Request By: ${message.author.tag}`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})
            locked.push(message.channel.id)
        } else {
            await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true})

            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`**This channel now has been unlocked!**`)
                .setFooter(`Request By: ${message.author.tag}`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})
            locked.splice(locked.indexOf(message.channel.id), 1)
        }       

    }
}