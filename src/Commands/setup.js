const { MessageEmbed, Permissions } = require('discord.js');
const index = require('../index');
const channelUtils = require('../Libraries/Utils/UChannel');

module.exports = class setup {
    constructor() {
        this.name = 'setup',
            this.alias = [],
            this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions")

        if (args.length < 2) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ED3419')
                .setTitle('Invalid arguments!')
                .setDescription('Please re-write the command with an argument that is showing below; ```statistics | wordle```')

            message.channel.send({ embeds: [errorEmbed] })
            return;
        }

        let online = 0;
        message.guild.members.cache.filter(member => {
            if (member.user.bot || member.presence === null) return;
            if (member.presence.status === "online") online++;
        });
        const boosters = !message.guild.roles.cache.get(`Nitro Booster`) ? 0 : message.guild.roles.cache.get(`Nitro Booster`).members.size;

        if (args[1].toLowerCase() === "statistics") {

            await message.guild.channels.create('📊 STATS 📊', { type: 'GUILD_CATEGORY', position: 0, permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }
            ]}).then(async (category) => {
                let channels = [];

                await  message.guild.channels.create(`Server total: ${message.guild.memberCount.toLocaleString()}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Bots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Online: ${online}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Boosters: ${boosters}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Roles: ${message.guild.roles.cache.size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Channels: ${message.guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Voice Channels: ${message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Text Channels: ${message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                await message.guild.channels.create(`Categories: ${message.guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size}`, { type: 'GUILD_VOICE', parent: category, permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL', 'CONNECT'],
                    }
                ]}).then((channel) => {
                    channels.push(channel);
                });

                channels.push(category);

                index.databaseConnection.query(`INSERT INTO peligonCoreStats (guild_id, server_total, humans, bots, online, boosters, roles, channels, voice_channels, text_channels, categories, statistics_category)
                VALUES ('${message.guild.id}', ${channels[0].id}, ${channels[1].id}, ${channels[2].id}, ${channels[3].id}, ${channels[4].id}, ${channels[5].id}, ${channels[6].id}, ${channels[7].id}, ${channels[8].id}, ${channels[9].id}, ${channels[10].id})`);
                console.log(`Setting up statistics for > ${message.guild.name} inside of database; Inserting them now!`)
            })

            const successEmbed = new MessageEmbed()
                .setColor('#A3DE34')
                .setDescription('Statistics channels has been set up.')
            message.channel.send({ embeds: [successEmbed] })
        } else if (args[1].toLowerCase() === "wordle") {
            await message.guild.channels.create('🏓  Wordle  🏓', { type: 'GUILD_CATEGORY', permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }
            ]}).then(async (category) => {
                await channelUtils.setWordleCategory(message.guild, category.id);
            });
            
            const successEmbed = new MessageEmbed()
                .setColor('#A3DE34')
                .setDescription('Wordle has been set up.')
            message.channel.send({ embeds: [successEmbed] })
        }
    }

}
