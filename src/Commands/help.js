const {Permissions, MessageEmbed} = require('discord.js');
const DiscordPages = require('../Libraries/Packages/DiscordEmbedPages');
const databaseUtils = require("../Libraries/Utils/databaseUtils");
const channelUtils = require("../Libraries/Utils/channelUtls");

module.exports = class helpMenu {
    constructor() {
        this.name = 'help'
        this.alias = []
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        const messageSent = new MessageEmbed()
            .setColor('#00aa00')
            .setDescription(`${message.author} Check your DMs`)

        // Menus
        let helpMenu;
        let statisticChannelsMenu;
        let statisticChannelTypes;

        /** Help Menu */
        {
            helpMenu = new MessageEmbed()
                .setColor('#212226')
                .setTitle('Peligon Help • Server Settings')
                .setDescription('Welcome to the settings menu. This is where you find out\n' +
                    'everything you need to know about this bot!\n\n' +
                    '**Currently Viewing Server:**\n' +
                    `▷ ${message.guild.name}\n` +
                    '**Server Stats:**\n' +
                    `Total Members ▷ \` ${message.guild.memberCount.toLocaleString()} \`` +
                    `Total Channels ▷ \` ${message.guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size} \`` +
                    '\n━━━━━━━━━━━━━━━━━━━━━━━━━━')
                .addFields(
                    {
                        name: `Prefix`,
                        value: '```' + await databaseUtils.getServerPrefix(message.guild) + '```'
                    },
                    {
                        name: `Welcome Announcements: | Disabled | ✅`,
                        value: '▷ Channel: N/A\n▷ Welcome Message:```This is a welcome message```'
                    },
                    {
                        name: `Leave Annoucements: | Disabled | ❌`,
                        value: '▷ Channel: N/A\n▷ Leave Message:```This is a leave message```'
                    }
                )
        }

        /** Statistics Help Menu */
        {
            statisticChannelsMenu = new MessageEmbed()
                .setColor('#212226')
                .setTitle('Peligon Help • Server Settings')
                .setDescription('Welcome to the settings menu. This is where you find out\n' +
                    'everything you need to know about this bot!\n\n' +
                    '**Currently Viewing Server:**\n' +
                    `▷ ${message.guild.name}\n` +
                    '**Server Stats:**\n' +
                    `Total Members ▷ \` ${message.guild.memberCount.toLocaleString()} \`` +
                    `Total Channels ▷ \` ${message.guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size} \`` +
                    '\n━━━━━━━━━━━━━━━━━━━━━━━━━━');

            /** fields */
            {
                let channelsSetup = 0;
                if (await channelUtils.getStatisticsCatagory(message.guild) !== undefined && await channelUtils.getStatisticsCatagory(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Statstics Catagory - Use __**${await databaseUtils.getServerPrefix(message.guild)}statistics**__ *for more information.*`,
                        `\`\`\` ${await channelUtils.getStatisticsCatagory(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getServerTotalChannel(message.guild) !== undefined && await channelUtils.getServerTotalChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Server Total ID`,
                        `\`\`\` ${await channelUtils.getServerTotalChannel(message.guild)} \`\`\``,
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getHumansChannel(message.guild) !== undefined && await channelUtils.getHumansChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Humans ID`,
                        `\`\`\` ${await channelUtils.getHumansChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getBotsChannel(message.guild) !== undefined && await channelUtils.getBotsChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Bots ID`,
                        `\`\`\` ${await channelUtils.getBotsChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getOnlineChannel(message.guild) !== undefined && await channelUtils.getOnlineChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Online ID`,
                        `\`\`\` ${await channelUtils.getOnlineChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getBoostersChannel(message.guild) !== undefined && await channelUtils.getBoostersChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Boosters ID`,
                        `\`\`\` ${await channelUtils.getBoostersChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getRolesChannel(message.guild) !== undefined && await channelUtils.getRolesChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Roles ID`,
                        `\`\`\` ${await channelUtils.getRolesChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getTotalChannelsChannel(message.guild) !== undefined && await channelUtils.getTotalChannelsChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Channels ID`,
                        `\`\`\` ${await channelUtils.getTotalChannelsChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getTotalVoiceChannelsChannel(message.guild) !== undefined && await channelUtils.getTotalVoiceChannelsChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Voice Channels ID`,
                        `\`\`\` ${await channelUtils.getTotalVoiceChannelsChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getTotalTextChannelsChannel(message.guild) !== undefined && await channelUtils.getTotalTextChannelsChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Text Channels ID`,
                        `\`\`\` ${await channelUtils.getTotalTextChannelsChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }

                if (await channelUtils.getCategoryChannel(message.guild) !== undefined && await channelUtils.getCategoryChannel(message.guild) !== "null") {
                    statisticChannelsMenu.addField(
                        `Catagories ID`,
                        `\`\`\` ${await channelUtils.getCategoryChannel(message.guild)} \`\`\``
                    )
                    channelsSetup++;
                }
                if (channelsSetup < 1) {
                    statisticChannelsMenu.addField(
                        `Statistics has not been set up for the server!`,
                        `Use __**${await databaseUtils.getServerPrefix(message.guild)}statistics**__ *for more information.*`
                    )
                }
            }
        }

        /** Statistic Channel Types Menu */
        {

            statisticChannelTypes = new MessageEmbed()
                .setColor('#212226')
                .setTitle('Peligon Help • Server Settings')
                .setDescription('Welcome to the settings menu. This is where you find out\n' +
                    'everything you need to know about this bot!\n\n' +
                    '**Currently Viewing Server:**\n' +
                    `▷ ${message.guild.name}\n` +
                    '**Server Stats:**\n' +
                    `Total Members ▷ \` ${message.guild.memberCount.toLocaleString()} \`` +
                    `Total Channels ▷ \` ${message.guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size} \`` +
                    '\n━━━━━━━━━━━━━━━━━━━━━━━━━━')
                .addFields(
                    {
                        name: `Server total`,
                        value: `prefix ▷ \`server_total\``,
                        inline: true
                    },
                    {
                        name: `Humans`,
                        value: `prefix ▷ \`humans\``,
                        inline: true
                    },
                    {
                        name: `Bots`,
                        value: `prefix ▷ \`bots\``,
                        inline: true
                    },
                    {
                        name: `Online`,
                        value: `prefix ▷ \`online\``,
                        inline: true
                    },
                    {
                        name: `Boosters`,
                        value: `prefix ▷ \`boosters\``,
                        inline: true
                    },
                    {
                        name: `Roles`,
                        value: `prefix ▷ \`roles\``,
                        inline: true
                    },
                    {
                        name: `Channels`,
                        value: `prefix ▷ \`channels\``,
                        inline: true
                    },
                    {
                        name: `Voice Channels`,
                        value: `prefix ▷ \`voice_channels\``,
                        inline: true
                    },
                    {
                        name: `Text Channels`,
                        value: `prefix ▷ \`text_channels\``,
                        inline: true
                    },
                    {
                        name: `Categories`,
                        value: `prefix ▷ \`Categories\``
                    }
                )
        }

        const pages = [
            helpMenu,
            statisticChannelsMenu,
            statisticChannelTypes
        ];
        const embedPages = new DiscordPages({
            pages: pages,
            channel: message.author
        });
        embedPages.createPages();

        message.channel.send({embeds: [messageSent]})
    }

}