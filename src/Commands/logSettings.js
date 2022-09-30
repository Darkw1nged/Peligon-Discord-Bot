const { MessageEmbed } = require('discord.js');
const channelUtils = require('../Libraries/Utils/UChannel');

module.exports = class Log {
    constructor() {
        this.name = 'log'
        this.alias = []
        this.usage = ``
    }

    async run(client, message, args, user) {

        if (args.length < 2) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle('Invalid arguments!')
                .setDescription('Please re-write the command with an argument that is showing below; ```set [channel-id]```')

            message.channel.send({embeds: [errorEmbed]})
            return;
        }

        if (args[1].toLowerCase() === "set") {
            if (args.length < 3) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle('Invalid arguments!')
                    .setDescription('Please re-write the command with an argument that is showing below; ```set [channel-id]```')

                message.channel.send({embeds: [errorEmbed]})
                return;
            }

            const channel = message.guild.channels.cache.get(args[2]);
            if (channel === undefined) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle("Inavlid channel!")
                    .setDescription(`\` ${args[2]} \` is not a channel!`)

                message.channel.send({embeds: [errorEmbed]})
                return;
            }

            await channelUtils.setLogsChannel(message.guild, channel);

            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`You have sucessfully updated the logs channel (<#${channel.id}>)`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})

        }

    }

}