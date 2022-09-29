const wordSearch = require('../Libraries/Packages/WordSearch');
const randomWords = require('../Libraries/Packages/RandomWords');
const { MessageEmbed } = require('discord.js')

module.exports = class Wordle {
    constructor() {
        this.name = 'wordsearch'
        this.alias = ['ws', 'word-search']
        this.usage = ``
    }

    async run(client, message, args, user) {
        const words = randomWords(24)
        let puzzleGrid = wordSearch.createPuzzle(27, 27, 'en', words)
        puzzleGrid = wordSearch.hideWords(puzzleGrid, 'en')
        let lines = wordSearch.printGrid(puzzleGrid)

        // EASY - 10x10, 3 words
        // MEDIUM - 16x16, 5 words
        // HARD - 20x20, 9 words
        // EXPERT - 27x27, 15 words
        // NIGHTMARE - 27x27, 24 words

        let desceiption = ""

        for(let i = 0; i < lines.length; i++) {
            desceiption += lines[i] + "\n"
        }

        const showcase = new MessageEmbed()
            .setColor("#ffffff")
            .setTitle('Word Search')
            .setDescription(`\`\`\`${desceiption}\`\`\``)
            
        console.log(words)

        message.channel.send({ embeds: [showcase] })
    }
}

