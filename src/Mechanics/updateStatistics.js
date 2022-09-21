const channelUtils = require('../Libraries/Utils/channelUtls');

module.exports = async (client) => {

    function updateStats() {
        client.guilds.cache.forEach(async (guild) => {
            const ServerTotalChannel = guild.channels.cache.get(await channelUtils.getServerTotalChannel(guild));
            const HumansChannel = guild.channels.cache.get(await channelUtils.getHumansChannel(guild));
            const BotsChannel = guild.channels.cache.get(await channelUtils.getBotsChannel(guild));
            const OnlineChannel = guild.channels.cache.get(await channelUtils.getOnlineChannel(guild));
            const BoostersChannel = guild.channels.cache.get(await channelUtils.getBoostersChannel(guild));
            const RolesChannel = guild.channels.cache.get(await channelUtils.getRolesChannel(guild));
            const ChannelsChannel = guild.channels.cache.get(await channelUtils.getTotalChannelsChannel(guild));
            const VoiceChannelsChannel = guild.channels.cache.get(await channelUtils.getTotalVoiceChannelsChannel(guild));
            const TextChannelsChannel = guild.channels.cache.get(await channelUtils.getTotalTextChannelsChannel(guild));
            const CategoriesChannel = guild.channels.cache.get(await channelUtils.getCategoryChannel(guild));
    
            ServerTotalChannel?.setName(`Server Total: ${guild.memberCount.toLocaleString()}`, "Updating statistics");
            HumansChannel?.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`, "Updating statistics");
            BotsChannel?.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`, "Updating statistics");
    
            let online = 0;
            guild.members.cache.filter(member => {
                if (member.user.bot || member.presence === null) return;
                if (member.presence.status === "online") online++;
            });
            OnlineChannel?.setName(`Online: ${online}`, "Updating statistics");

            !guild.roles.cache.get(`Nitro Booster`) ? BoostersChannel?.setName(`Boosters: 0`, "Updating statistics") :
             BoostersChannel?.setName(`Boosters: ${guild.roles.cache.get(`Nitro Booster`).members.size}`, "Updating statistics");
    
            RolesChannel?.setName(`Roles: ${guild.roles.cache.size}`, "Updating statistics")
            ChannelsChannel?.setName(`Channels: ${guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size}`, "Updating statistics");
            VoiceChannelsChannel?.setName(`Voice Channels: ${guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}`, "Updating statistics");
            TextChannelsChannel?.setName(`Text Channels: ${guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}`, "Updating statistics");
            CategoriesChannel?.setName(`Categories: ${guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size}`, "Updating statistics");

            setTimeout(updateStats, 1000 * 60 * 2)
        });
    }
    updateStats();
}