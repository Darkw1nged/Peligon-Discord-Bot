const { MessageEmbed } = require('discord.js');
const wordleUtils = require('../Libraries/Utils/wordleUtils');
const randomWords = require('../Libraries/Packages/RandomWords');
const leaderboardUtils = require('../Libraries/Utils/leaderboardUtils');
const hasFinished = new Set();

module.exports = async (client) => {

    client.on('messageCreate', async (message) => {
        if (message.channel.type === 'DM') return;
        if (message.author.bot) return;
    
        const channel = message.guild.channels.cache.get(await wordleUtils.getChannel(message.guild, message.author));
        if (channel === undefined) return;

        if (channel.id === message.channel.id) {
            if (message.content.length !== 5 || !randomWords.wordList.includes(message.content.toLowerCase())) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle('Invalid word!')
                    .setDescription('▷ Words must be spelt corrently.\n▷ Words must have 5 letters in them.');

                message.channel.send({ embeds: [errorEmbed] });
                return;
            }

            const word = await wordleUtils.getWord(message.guild, message.author, message.channel);
            if (message.content !== word) {
                await wordleUtils.incrementTries(message.guild, message.author, message.channel);
            } else {
                hasFinished.add(message.author.id);
                await wordleUtils.endGane(message.guild, message.author, false);
                setTimeout(() => {
                    message.channel.delete();
                    hasFinished.delete(message.author.id)
                }, 1000 * 30);
            }

            let foundChars = [];
            let pattern = "";
            for (let i=0; i<message.content.length; i++) {
                if (message.content[i] === word[i]) {
                    pattern += '🟩 ';
                } else if (word.includes(message.content[i]) && !foundChars.includes(message.content[i])) {
                    pattern += '🟨 ';
                } else {
                    pattern += '⬛ ';
                }
            }

            const gameStarted = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle("Wordle - Current status")
                .setDescription(pattern);

            message.channel.send({ embeds: [gameStarted] })

            if (await wordleUtils.getTries(message.guild, message.author, message.channel) >= 6) {
                hasFinished.add(message.author.id);
                await wordleUtils.endGane(message.guild, message.author, true);
                setTimeout(() => {
                    message.channel.delete();
                    hasFinished.delete(message.author.id);
                }, 1000 * 30);
            }

            if (hasFinished.has(message.author.id)) {
                 const gameEnding = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle("Wordle - Game Finsihed!")
                    .setDescription(``)
                    .addFields(
                        {
                            name: "The word was",
                            value: `\` ${word} \``
                        },
                        { 
                            name: "Words guessed",
                            value: `\` ${await wordleUtils.getGuessed(message.guild, message.author)} \``,
                            inline: true
                        },
                        { 
                            name: "Words failed",
                            value: `\` ${await wordleUtils.getLosses(message.guild, message.author)} \``,
                            inline: true                        
                        },
                        { 
                            name: "Current Streak",
                            value: `\` ${await wordleUtils.getWinStreak(message.guild, message.author)} \``,
                            inline: true    
                        },
                        { 
                            name: "Best Streak",
                            value: `\` ${await wordleUtils.getBestWinStreak(message.guild, message.author)} \``,
                            inline: true                        
                        },
                        { 
                            name: "Leaderboard Position",
                            value: `\` #${await leaderboardUtils.getWordleCurrentStreak(message.guild, message.author)} \``,
                            inline: true                        
                        },
                        { 
                            name: "Best Leaderboard Position",
                            value: `\` #${await leaderboardUtils.getWordleBestStreak(message.guild, message.author)} \``,
                            inline: true                        
                        }
                    )

                message.channel.send({ embeds: [gameEnding] })
            }
           
        }
    });

}