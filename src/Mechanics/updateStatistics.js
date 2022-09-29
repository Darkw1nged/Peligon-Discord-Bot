const UStatistics = require('../Libraries/Utils/UStatistics');

module.exports = async (client) => {

    function updateStats() {
        client.guilds.cache.forEach(async (guild) => {
            const ServerTotalChannel = guild.channels.cache.get(await UStatistics.getServerTotalChannel(guild));
            const HumansChannel = guild.channels.cache.get(await UStatistics.getHumansChannel(guild));
            const BotsChannel = guild.channels.cache.get(await UStatistics.getBotsChannel(guild));
            const OnlineChannel = guild.channels.cache.get(await UStatistics.getOnlineChannel(guild));
            const BoostersChannel = guild.channels.cache.get(await UStatistics.getBoostersChannel(guild));
            const RolesChannel = guild.channels.cache.get(await UStatistics.getRolesChannel(guild));
            const ChannelsChannel = guild.channels.cache.get(await UStatistics.getTotalChannelsChannel(guild));
            const VoiceChannelsChannel = guild.channels.cache.get(await UStatistics.getTotalVoiceChannelsChannel(guild));
            const TextChannelsChannel = guild.channels.cache.get(await UStatistics.getTotalTextChannelsChannel(guild));
            const CategoriesChannel = guild.channels.cache.get(await UStatistics.getCategoryChannel(guild));
    
            if (ServerTotalChannel !== undefined) {
                ServerTotalChannel.setName(`Server Total: ${guild.memberCount.toLocaleString()}`, "Updating statistics");
            }

            if (HumansChannel !== undefined) {
                HumansChannel.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`, "Updating statistics");
            }

            if (BotsChannel !== undefined) {
                BotsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`, "Updating statistics");
            }

            if (OnlineChannel !== undefined) {
                let online = 0;
                guild.members.cache.filter(member => {
                    if (member.user.bot || member.presence === null) return;
                    if (member.presence.status === "online") online++;
                });
                OnlineChannel.setName(`Online: ${online}`, "Updating statistics");
            }

            if (BoostersChannel !== undefined) {
                !guild.roles.cache.get(`Nitro Booster`) ? BoostersChannel.setName(`Boosters: 0`, "Updating statistics") :
                    BoostersChannel.setName(`Boosters: ${guild.roles.cache.get(`Nitro Booster`).members.size}`, "Updating statistics");
            }

            if (RolesChannel !== undefined) {
                RolesChannel.setName(`Roles: ${guild.roles.cache.size}`, "Updating statistics");
            }

            if (ChannelsChannel !== undefined) {
                ChannelsChannel.setName(`Channels: ${guild.channels.cache.filter(c => c.type !== 'GUILD_CATEGORY').size}`, "Updating statistics");
            }

            if (VoiceChannelsChannel !== undefined) {
                VoiceChannelsChannel.setName(`Voice Channels: ${guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size}`, "Updating statistics");
            }

            if (TextChannelsChannel !== undefined) {
                TextChannelsChannel.setName(`Text Channels: ${guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size}`, "Updating statistics");
            }

            if (CategoriesChannel !== undefined) {
                CategoriesChannel.setName(`Categories: ${guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size}`, "Updating statistics");
            }
        });
        setTimeout(updateStats, 1000 * 60 * 2)
    }

    updateStats();

}