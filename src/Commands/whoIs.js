const { MessageEmbed, Permissions } = require('discord.js');
const moment = require('moment');
const databaseUtils = require('../Libraries/Utils/databaseUtils');
const experienceUtils = require('../Libraries/Utils/ExperienceUtils');
const economyUtils = require('../Libraries/Utils/EconomyUtils');
const wordleUtils = require('../Libraries/Utils/wordleUtils');

module.exports = class whoIs {
    constructor() {
        this.name = 'whois'
        this.alias = ['user-info']
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");
        const member = await message.guild.members.cache.get(message.author.id);

        let roles = "";
        for (let i=0; i<Array.from(member.roles.cache).length; i++) {
            let toAdd = (Array.from(member.roles.cache)[i]).toString().split(',');
            if (toAdd[0] === message.guild.id) continue;
            roles += toAdd[1] + " "
        }

        const information = new MessageEmbed()
            .setColor('#FFA500')
            .setTitle(`User info - ${message.author.tag}`)
            .setThumbnail(message.author.avatarURL())
            .addFields(
                {
                    name: "ID:",
                    value: member.id,
                    inline: true
                },
                {
                    name: "Username:",
                    value: message.author.username,
                    inline: true
                },
                {
                    name: "Nickname:",
                    value: member.nickname === null ? "Not set." : member.nickname,
                    inline: true
                },
                {
                    name: "Created Account on:",
                    value: moment(message.author.createdAt).toDate().toUTCString()
                },
                {
                    name: "Joined Server on:",
                    value: moment(member.joinedAt).toDate().toUTCString()
                },
                {
                    name: "Roles:",
                    value: roles,
                    inline: true
                },
                {
                    name: "Highest Role:",
                    value: `<@&${member.roles.cache.at(0).id}>`,
                    inline: true
                },
                {
                    name: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
                    value: "**User Statistics**"
                },
                {
                    name: "Infractions:",
                    value: `\` ${await databaseUtils.getUserInfractions(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Level:",
                    value: `\` ${await experienceUtils.getLevel(message.guild, message.author)} \``,
                    inline: true 
                },
                {
                    name: "Experience:",
                    value: `\` ${await experienceUtils.getExperience(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Coins:",
                    value: `\` $${await economyUtils.getCoins(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Bank Balance:",
                    value: `\` $${await economyUtils.getBankBalance(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Wordle Wins:",
                    value: `\` ${await wordleUtils.getGuessed(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Wordle Losses:",
                    value: `\` ${await wordleUtils.getLosses(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Current Win Streak:",
                    value: `\` ${await wordleUtils.getWinStreak(message.guild, message.author)} \``,
                    inline: true
                },
                {
                    name: "Longest Win Streak:",
                    value: `\` ${await wordleUtils.getBestWinStreak(message.guild, message.author)} \``,
                    inline: true
                }
            )
        message.channel.send({ embeds: [information] })
    }
}