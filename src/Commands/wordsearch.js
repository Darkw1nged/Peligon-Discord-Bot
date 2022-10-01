const wordSearch = require('../Libraries/Packages/WordSearch');
const randomWords = require('../Libraries/Packages/RandomWords');
const { MessageEmbed } = require('discord.js')
const UWordSeach = require('../Libraries/Utils/UWordSeach');
const channelUtils = require('../Libraries/Utils/UChannel');
const UDatabase = require('../Libraries/Utils/UDatabase');
const leaderboardUtils = require('../Libraries/Utils/ULeaderboard');

module.exports = class Wordle {
    constructor() {
        this.name = 'wordsearch'
        this.alias = ['ws', 'word-search']
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (await channelUtils.getGamesCategory(message.guild) === undefined) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle('Operation incomplete!')
                .setDescription('Word Search has not been set up on this server yet.\nPlease ask the administration team to do so.')

            message.channel.send({ embeds: [errorEmbed] });
            return;
        }

        if (await UWordSeach.inGame(message.guild, message.author)) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setDescription('You have already have a word search game running.\nPlease finish your current game.')

            message.channel.send({ embeds: [errorEmbed] });
            return;
        }

        if (args.length < 2) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle('Invalid arguments!')
                .setDescription('Please re-write the command with an argument that is showing below; ```Easy | Medium | Hard | Expert | Nightmare```\n**Expert and Nightmare and not recomended for phone users.**')

            message.channel.send({embeds: [errorEmbed]})
            return;
        }

        const difficulty = args[1].toLowerCase();
        console.log(`${message.author.tag} is trying to start a word search.\nSetting up a new word search game.`);

        const totalWords = difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : difficulty === "hard" ? 9 : difficulty === "expert" ? 15 : 24;
        const gameWords = randomWords(totalWords);
        let words = "";
        
        for (let i=0; i<gameWords.length; i++) {
            if (i == gameWords.length - 1) {
                words += gameWords[i];
                continue;
            }
            words += gameWords[i] + ",";
        }

        const boardRadius = difficulty === "easy" ? 10 : difficulty === "medium" ? 16 : difficulty === "hard" ? 20 : 27;
        const board = wordSearch.hideWords(wordSearch.createPuzzle(boardRadius, boardRadius, 'en', gameWords), 'en')
        const boardLines = wordSearch.printGrid(board)

        let category = client.channels.cache.get(await channelUtils.getGamesCategory(message.guild));
        await message.guild.channels.create(` ${message.author.username} Word-Search`, { type: 'GUILD_TEXT', parent: category, permissionOverwrites: [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            { 
                id: message.author.id,
                allow: ['VIEW_CHANNEL']
            }
        ]}).then(async (channel) => {
            await UWordSeach.startGame(message.guild, message.author, channel, difficulty, boardLines, words);
            console.log(`Word Seach Game -> Game ${message.author.username}'s words are ${words}`)

            const gameInformation = new MessageEmbed()
                .setColor('#FFA500')
                .setTitle("Welcome to your Word Search")
                .setDescription("**How it works:**\n▷ You can view your puzzel below.\n▷ You have **" + totalWords + "** words to find.\n▷ You need to try and find all words.\n▷ If you ever want to give up just do **" + await UDatabase.getServerPrefix(message.guild) + "forfit** to end the game.\n▷ You will be told if you have found a word or not.")
                .addFields(
                    { 
                        name: "Games Won",
                        value: `\` ${await UWordSeach.getGamesWon(message.guild, message.author)} \``,
                        inline: true
                    },
                    { 
                        name: "Games Forfitted",
                        value: `\` ${await UWordSeach.getGamesForfeited(message.guild, message.author)} \``,
                        inline: true                        
                    },
                    { 
                        name: "Current Streak",
                        value: `\` ${await UWordSeach.getWinStreak(message.guild, message.author)} \``,
                        inline: true    
                    },
                    { 
                        name: "Best Streak",
                        value: `\` ${await UWordSeach.getBestWinStreak(message.guild, message.author)} \``,
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

            let desceiption = ""
            for(let i = 0; i < boardLines.length; i++) {
                desceiption += boardLines[i] + "\n"
            }
        
            const showcase = new MessageEmbed()
                .setColor("#FFA500")
                .setTitle('Word Search - Grid')
                .setDescription(`\`\`\`${desceiption}\`\`\``)
                            
            channel.send({ embeds: [gameInformation, showcase] })

            channel.send(`<@${message.author.id}>`).then((ping) => {
                ping.delete();    
            })
        })
    }
}

