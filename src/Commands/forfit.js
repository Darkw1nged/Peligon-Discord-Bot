const { MessageEmbed } = require('discord.js');
const wordleUtils = require('../Libraries/Utils/UWordle');
const wordSearchUtils = require('../Libraries/Utils/UWordSeach');

module.exports = class Forfit {
    constructor() {
        this.name = 'forfit'
        this.alias = ['ff']
        this.usage = ``
    }

    async run(client, message, args, user) {

        if (wordleUtils.inGame(message.guild, message.author) || wordSearchUtils.inGame(message.guild, message.author)) {
            const wordleChannel = message.guild.channels.cache.get(await wordleUtils.getChannel(message.guild, message.author));
            const wordSearchChannel = message.guild.channels.cache.get(await wordSearchUtils.getChannel(message.guild, message.author));

            if (wordleChannel !== undefined && message.channel.id == wordleChannel?.id || wordSearchChannel !== undefined && message.channel.id == wordSearchChannel.id) {
                if (message.channel.id == wordleChannel?.id ) {
                    wordleUtils.endGane(message.guild, message.author, true);
                    setTimeout(() => {
                        wordleChannel.delete();
                    }, 1000 * 10);
                } else {
                    wordSearchUtils.endGane(message.guild, message.author, true);
                    setTimeout(() => {
                        wordSearchChannel.delete();
                    }, 1000 * 10);
                }

                const operationComplete = new MessageEmbed()
                    .setColor('#A3DE34')
                    .setTitle(`Operation Complete!`)
                    .setDescription(`You have successfully forfeited your game.`)
                    .setTimestamp()

                message.channel.send({embeds: [operationComplete]})

            } else {
                const operationIncomplete = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle(`Operation Incomplete!`)
                    .setDescription(`You must be in your active game channel in order to use this command.`)
                    .setTimestamp()

                message.channel.send({embeds: [operationIncomplete]})
            }
        } else {
            const operationIncomplete = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle(`Operation Incomplete!`)
                .setDescription(`You must be in an active game in order to use this command.`)
                .setTimestamp()

            message.channel.send({embeds: [operationIncomplete]})
        }
    }
}