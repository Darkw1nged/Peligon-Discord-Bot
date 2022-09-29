const databaseUtils = require('../Libraries/Utils/databaseUtils');
const leaderboardUtils = require('../Libraries/Utils/leaderboardUtils');
const economyUtils = require('../Libraries/Utils/EconomyUtils');
const experienceUtils = require('../Libraries/Utils/ExperienceUtils');
const channelUtils = require('../Libraries/Utils/channelUtls');
const wordleUtils = require('../Libraries/Utils/wordleUtils');
const index = require('../index');
const recentlyChatted = new Set();
const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {

    client.on('messageCreate', async (message) => {
        if (message.channel.type === 'DM') return;
        if (message.author.bot) return;

        databaseUtils.isUserInDatabase(message.guild, message.author).then(async (result) => {
            if (!result) {
                index.databaseConnection.query(`INSERT INTO users (guild_id, user_id)
                VALUES ('${message.guild.id}', '${message.author.id}')`);

                index.databaseConnection.query(`INSERT INTO leaderboard (guild_id, user_id)
                VALUES ('${message.guild.id}', '${message.author.id}')`);

                index.databaseConnection.query(`INSERT INTO wordle_profile (guild_id, user_id)
                VALUES ('${message.guild.id}', '${message.author.id}')`);
                console.log(`Could not find user > ${message.author.username} inside of database; Inserting them now!`)
            }
        })
        if (message.content.startsWith(await databaseUtils.getServerPrefix(message.guild))) return;
        if (recentlyChatted.has(message.author.id)) return;

        const channel = message.guild.channels.cache.get(await wordleUtils.getChannel(message.guild, message.author));
        if (channel !== undefined && message.channel.id == channel.id) return;

        if (!recentlyChatted.has(message.author.id)) {
            recentlyChatted.add(message.author.id);
            setTimeout(() => {
                recentlyChatted.delete(message.author.id);
            }, 1000 * 60);
        }

        // Adding experience to the user
        let level = await experienceUtils.getLevel(message.guild, message.author);
        const experienceEarned = Math.floor(Math.random() * 35) + 10
        const nextLevel = 5 * (Math.pow(level, 2)) + (50 * level) + 100
        let ranckedUp = false;
        await experienceUtils.addExperience(message.guild, message.author, experienceEarned);

        let experience = await experienceUtils.getExperience(message.guild, message.author);
        if (experience >= nextLevel) {
            await experienceUtils.addLevel(message.guild, message.author);
            await experienceUtils.removeExperience(message.guild, message.author, nextLevel)
            ranckedUp = true;

            level = await experienceUtils.getLevel(message.guild, message.author);
            await leaderboardUtils.updateLeaderboardLevelPosition(message.guild, message.author, level);

            const rankChannelID = await channelUtils.getLogsChannel(message.guild);
            const rankChannel = message.guild.channels.cache.get(rankChannelID);

            if (rankChannel === undefined) {
                message.channel.send(`GG ${message.author}, you just advanced to level ${level}!`);
            } else {
                rankChannel.send(`GG ${message.author}, you just advanced to level ${level}!`);
            }
        }

        // Adding money to the user
        const coinsEarned = Math.floor(Math.random() * 35) + 10;
        await economyUtils.addCoins(message.guild, message.author, coinsEarned);

        const coins = await economyUtils.getCoins(message.guild, message.author);
        await leaderboardUtils.updateLeaderboardCoinsPosition(message.guild, message.author, coins);

        const logChannelID = await channelUtils.getLogsChannel(message.guild);
        const logChannel = message.guild.channels.cache.get(logChannelID);

        if (logChannel === undefined) {
            console.log(`Updating user ${message.author.tag}'s information!`)
            return;
        }
        const logEmbed = new MessageEmbed()
            .setColor('0x66BB6A')
            .setAuthor('Account Updated', "https://images.emojiterra.com/twitter/v13.0/512px/1f4c1.png")
            .setDescription(`**User:** ${message.author}\n**Amount:** Experience: \`+${experienceEarned}\` |  Level: \`+${ranckedUp ? level : 0}\`\n**Amount:** Money: \`+${coinsEarned}\` |  bank: \`+0\`\n**Reason:** Chatting`)
            .setTimestamp()
        logChannel.send({embeds: [logEmbed] })
    });

}