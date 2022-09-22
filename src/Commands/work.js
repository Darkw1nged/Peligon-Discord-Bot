const leaderboardUtils = require('../Libraries/Utils/leaderboardUtils');
const economyUtils = require('../Libraries/Utils/EconomyUtils');
const channelUtils = require('../Libraries/Utils/channelUtls');
const recentlyWorked = new Set();
const { MessageEmbed } = require('discord.js');

module.exports = class work {
    constructor() {
        this.name = 'work'
        this.alias = []
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (recentlyWorked.has(message.author.id)) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setDescription('You have recently worked. Please wait before trying again!')

            message.channel.send({ embeds: [errorEmbed] })
            return;
        }
        
        console.log(`${message.author.tag} is trying to work!`)
        const earned = Math.floor((Math.random() * 30) + 15)

        await economyUtils.addCoins(message.guild, message.author, earned);
        const cash = await economyUtils.getCoins(message.guild, message.author);
        await leaderboardUtils.updateLeaderboardCoinsPosition(message.guild, message.author, cash);

        const workCompleted = new MessageEmbed()
            .setColor('#A3DE34')
            .setTitle(`You earned $${earned} coins!`)
            .setDescription(`You currently have $${cash} coins.`)
            .setTimestamp()

        message.channel.send({ embeds: [workCompleted] })

        if (!recentlyWorked.has(message.author.id)) {
            recentlyWorked.add(message.author.id);
            setTimeout(() => {
                recentlyWorked.delete(message.author.id);
            }, 1000 * 60 * 5);
        }

        const logChannelID = await channelUtils.getLogsChannel(message.guild);
        const logChannel = message.guild.channels.cache.get(logChannelID);

        if (logChannel === undefined) {
            console.log(`Updating user ${message.author.tag}'s information!`)
            return;
        }
        const logEmbed = new MessageEmbed()
            .setColor('0x66BB6A')
            .setAuthor('Account Updated', "https://images.emojiterra.com/twitter/v13.0/512px/1f4c1.png")
            .setDescription(`**User:** ${message.author}\n**Amount:** Money: \`+${earned}\` |  bank: \`+0\`\n**Reason:** Working`)
            .setTimestamp()
        logChannel.send({embeds: [logEmbed]})
    }
}