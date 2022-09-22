const wordleUtils = require('../Libraries/Utils/wordleUtils');
const channelUtils = require('../Libraries/Utils/channelUtls');
const leaderboardUtils = require('../Libraries/Utils/leaderboardUtils');
const { MessageEmbed } = require('discord.js');
const randomWords = require('../Libraries/Packages/RandomWords');

module.exports = class Wordle {
    constructor() {
        this.name = 'wordle'
        this.alias = ['w']
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (await channelUtils.getWordleCategory(message.guild) === undefined) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle('Operation incomplete!')
                .setDescription('Wordle has not been set up on this server yet.\nPlease ask the administration team to do so.')

            message.channel.send({ embeds: [errorEmbed] });
            return;
        }

        if (await wordleUtils.inGame(message.guild, message.author)) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setDescription('You have already started a game or wordle.\nPlease finish your current game.')

            message.channel.send({ embeds: [errorEmbed] });
            return;
        }
        console.log(`${message.author.tag} is trying to play wordle.\nSetting up a new wordle game.`);

        let category = client.channels.cache.get(await channelUtils.getWordleCategory(message.guild));
        await message.guild.channels.create(` ${message.author.username} Wordle`, { type: 'GUILD_TEXT', parent: category, permissionOverwrites: [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL']
            }
        ]}).then(async (channel) => {
            const word = randomWords();
            await wordleUtils.startGame(message.guild, message.author, channel, word);
            console.log(`Wordle Word -> Game ${message.author.username}'s word is ${word}`)

            const gameInformation = new MessageEmbed()
                .setColor('#FFA500')
                .setTitle("Welcome to wordle")
                .setDescription("**How it works:**\n▷ You will be shown a 5 letter word.\n▷ You have 6 attempts to guess it.\n▷ The gray square means the letter is not in the word.\n▷ The yellow square means the letter is in the word but it is not in the correct spot.\n▷ The green square means you have got a letter and its space correct!")
                .addFields(
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
                            
            channel.send({ embeds: [gameInformation] })

            channel.send(`<@${message.author.id}>`).then((ping) => {
                ping.delete();    
            })
        })
    }
}