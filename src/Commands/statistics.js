const {MessageEmbed} = require('discord.js');
const channelUtils = require('../Libraries/Utils/channelUtls');

module.exports = class Statistics {
    constructor() {
        this.name = 'statistics'
        this.alias = ['stats']
        this.usage = ``
    }

    async run(client, message, args, user) {

        if (args.length < 3) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle('Invalid arguments!')
                .setDescription('Please re-write the command with an argument that is showing below; ```remove [channel_id] | add [type]```')

            message.channel.send({embeds: [errorEmbed]})
            return;
        }

        if (args[1].toLowerCase() === "remove") {
            const channel = message.guild.channels.cache.get(args[2]);
            if (channel === undefined) {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle("Inavlid channel!")
                    .setDescription(`\` ${args[2]} \` is not a channel!`)

                message.channel.send({embeds: [errorEmbed]})
                return;
            }

            if (channel.name.startsWith("Server Total: ")) {
                await channelUtils.setServerTotalChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Humans: ")) {
                await channelUtils.setHumansChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Bots: ")) {
                await channelUtils.setBotsChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Online: ")) {
                await channelUtils.setOnlineChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Boosters: ")) {
                await channelUtils.setBoostersChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Roles: ")) {
                await channelUtils.setRolesChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Channels: ")) {
                await channelUtils.setTotalChannelsChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Voice Channels: ")) {
                await channelUtils.setTotalVoiceChannelsChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Text Channels: ")) {
                await channelUtils.setTotalTextChannelsChannel(message.guild, null);
                channel.delete();
            } else if (channel.name.startsWith("Categories: ")) {
                await channelUtils.setCategoryChannel(message.guild, null);
                channel.delete();
            } else {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ED3419')
                    .setTitle("Inavlid channel!")
                    .setDescription(`<#${channel.id}> is not a valid statistic channel!`)

                message.channel.send({embeds: [errorEmbed]})
                return;
            }

            const operationComplete = new MessageEmbed()
                .setColor('#A3DE34')
                .setTitle(`Operation complete!`)
                .setDescription(`Statistic channels have now been updated.`)
                .setTimestamp()

            message.channel.send({embeds: [operationComplete]})

        } else if (args[1].toLowerCase() === "add") {
            let catagoryFound = false;
            if (message.guild.channels.cache.find(channel => channel.name === "📊 STATS 📊")) {
                catagoryFound = true;
            }

            if (catagoryFound === false) {
                await message.guild.channels.create('📊 STATS 📊', {
                    type: 'GUILD_CATEGORY', position: 0, permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        }
                    ]
                }).then(async (category) => {
                    await channelUtils.setStatisticsCatagory(message.guild, category.id);
                })
            }

            const category = message.guild.channels.cache.find(channel => channel.name === "📊 STATS 📊");

            const type = args[2].toLowerCase();
            switch (type) {
                case "server_total":
                    await message.guild.channels.create(`Server total: ${message.guild.memberCount.toLocaleString()}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setServerTotalChannel(message.guild, channel.id);
                    });                  
                    break;
                case "humans":
                    await message.guild.channels.create(`Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setHumansChannel(message.guild, channel.id);
                    }); 
                    break;
                case "bots":
                    await message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setBotsChannel(message.guild, channel.id);
                    }); 
                    break;
                case "online":
                    await message.guild.channels.create(`Online: ${online}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setOnlineChannel(message.guild, channel.id);
                    }); 
                    break;
                case "boosters":
                    await message.guild.channels.create(`Boosters: ${boosters}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setBoostersChannel(message.guild, channel.id);
                    }); 
                    break;
                case "roles":
                    await message.guild.channels.create(`Roles: ${message.guild.roles.cache.size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setRolesChannel(message.guild, channel.id);
                    }); 
                    break;
                case "channels":
                    await message.guild.channels.create(`Channels: ${message.guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setTotalChannelsChannel(message.guild, channel.id);
                    }); 
                    break;
                case "voice_channels":
                    await message.guild.channels.create(`Voice Channels: ${message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setTotalVoiceChannelsChannel(message.guild, channel.id);
                    }); 
                    break;
                case "text_channels":

                    await message.guild.channels.create(`Text Channels: ${message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setTotalTextChannelsChannel(message.guild, channel.id);
                    }); 
                    break;
                case "Categories":
                    await message.guild.channels.create(`Categories: ${message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size}`, {
                        type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL', 'CONNECT'],
                            }
                        ]
                    }).then(async (channel) => {
                        await channelUtils.setCategoryChannel(message.guild, channel.id);
                    }); 
                    break;
            }


        }

    }

}