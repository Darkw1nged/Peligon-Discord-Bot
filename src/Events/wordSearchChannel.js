const { MessageEmbed } = require('discord.js');
const wordSearchUtils = require('../Libraries/Utils/UWordSeach');
const randomWords = require('../Libraries/Packages/RandomWords');
const leaderboardUtils = require('../Libraries/Utils/ULeaderboard');
const { plugin } = require('mongoose');
const hasFinished = new Set();
const wordsGuessed = [];

module.exports = async (client) => {

    client.on('messageCreate', async (message) => {
        if (message.channel.type === 'DM') return;
        if (message.author.bot) return;
    
        const channel = message.guild.channels.cache.get(await wordSearchUtils.getChannel(message.guild, message.author));
        if (channel === undefined) return;

        if (channel.id === message.channel.id) {
            const userGuess = message.content.toLowerCase();
            if (userGuess.startsWith("-")) return;

            if (userGuess.length !== 5 || !randomWords.wordList.includes(userGuess)) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle('Invalid word!')
                    .setDescription('▷ Words must be spelt corrently.\n▷ Words must have 5 letters in them.');

                message.channel.send({ embeds: [errorEmbed] });
                return;
            }

            if (wordsGuessed.includes(userGuess)) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle('Already guessed!')
                    .setDescription('You have already guessed that word.\n**Please try again!**');

                message.channel.send({ embeds: [errorEmbed] });
                return;
            }

            const gameWords = await wordSearchUtils.getWords(message.guild, message.author, message.channel).then(string => string.split(','));
            if (gameWords.includes(userGuess)) {
                const wordFound = new MessageEmbed()
                    .setColor('#A3DE34')
                    .setTitle('Word found!')
                    .setDescription("You have successfully found a word.")
                channel.send({ embeds: [wordFound] })
            } else {
                const notFound = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle('Whoops!')
                    .setDescription("Although that word may appear in word search. It is not one that im looking for.\n**Please try again!**")
                channel.send({ embeds: [notFound] })
            }
            wordsGuessed.push(userGuess)

            if (gameWords.every(v => wordsGuessed.includes(v))) {
                hasFinished.add(message.author.id);
                await wordSearchUtils.endGane(message.guild, message.author, false);
                setTimeout(() => {
                    message.channel.delete();
                    hasFinished.delete(message.author.id)
                }, 1000 * 30);
            }

            let formattedWords = "";
            for (let i=0; i<wordsGuessed.length; i++) {
                if (i == wordsGuessed.length - 1) {
                    formattedWords += wordsGuessed[i];
                } else {
                    formattedWords += wordsGuessed[i] + ", ";
                }
            }

            const boardLines = await wordSearchUtils.getLines(message.guild, message.author, message.channel).then(string => string.split(','));
            let desceiption = ""
            for(let i = 0; i < boardLines.length; i++) {
                desceiption += boardLines[i] + "\n"
            }
        
            const showcase = new MessageEmbed()
                .setColor("#FFA500")
                .setTitle('Word Search - Grid')
                .setDescription(`**Words Guessed**\n${formattedWords}\`\`\`${desceiption}\`\`\``)
                            
            channel.send({ embeds: [showcase] })

            if (hasFinished.has(message.author.id)) {
                const gameEnding = new MessageEmbed()
                   .setColor('#ED3419')
                   .setTitle("Word Search - Game Finished!")
                   .setDescription(``)
                   .addFields(
                       {
                           name: "Words you guessed",
                           value: `\` ${formattedWords} \``
                       },
                       { 
                           name: "Games Won",
                           value: `\` ${await wordSearchUtils.getGamesWon(message.guild, message.author)} \``,
                           inline: true
                       },
                       { 
                           name: "Games Forfeited",
                           value: `\` ${await wordSearchUtils.getGamesForfeited(message.guild, message.author)} \``,
                           inline: true                        
                       },
                       { 
                           name: "Current Streak",
                           value: `\` ${await wordSearchUtils.getWinStreak(message.guild, message.author)} \``,
                           inline: true    
                       },
                       { 
                           name: "Best Streak",
                           value: `\` ${await wordSearchUtils.getBestWinStreak(message.guild, message.author)} \``,
                           inline: true                        
                       },
                       { 
                           name: "Leaderboard Position",
                           value: `\` #${await leaderboardUtils.getWordSearchCurrentStreak(message.guild, message.author)} \``,
                           inline: true                        
                       },
                       { 
                           name: "Best Leaderboard Position",
                           value: `\` #${await leaderboardUtils.getWordSearchBestStreak(message.guild, message.author)} \``,
                           inline: true                        
                       }
                   )

               message.channel.send({ embeds: [gameEnding] })
           }
           
        }
    });

}