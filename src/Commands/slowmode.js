const { MessageEmbed, Permissions } = require('discord.js');

module.exports = class slowmode {
    constructor(){
        this.name = 'slowmode',
        this.alias = ['slow'],
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions")

        let cooldown = args[1];
        if (!cooldown) cooldown = 5;
        if (cooldown <= 0 || cooldown === "reset") {
            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`**This channel's cooldown has been reset.**`)
                .setFooter(`Request By: ${message.author.tag}`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})
        } else {
            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`**This channel is now has a ${cooldown} cooldown between messages.**`)
                .setFooter(`Request By: ${message.author.tag}`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})
        }
        await message.channel.setRateLimitPerUser(parseInt(cooldown), `Request By: ${message.author.tag}`);

    }
}