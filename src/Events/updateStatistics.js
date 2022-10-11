const UStatistics = require('../Libraries/Utils/UStatistics');

module.exports = async (client) => {

    const ServerTotalChannel = client.channels.cache.get(await UStatistics.getServerTotalChannel);
    const HumansChannel = client.channels.cache.get(await UStatistics.getHumansChannel);
    const BotsChannel = client.channels.cache.get(await UStatistics.getBotsChannel);

    client.on('guildMemberRemove', async member => {
        if (ServerTotalChannel !== undefined) {
            ServerTotalChannel.setName(`Server Total: ${guild.memberCount.toLocaleString()}`, "Updating statistics");
        }

        if (HumansChannel !== undefined) {
            HumansChannel.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`, "Updating statistics");  
        }
        
        if (BotsChannel !== undefined) {
            BotsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`, "Updating statistics");
        }
    });
    
    client.on('guildMemberAdd', async member => {
        if (ServerTotalChannel !== undefined) {
            ServerTotalChannel.setName(`Server Total: ${guild.memberCount.toLocaleString()}`, "Updating statistics");
        }

        if (HumansChannel !== undefined) {
            HumansChannel.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`, "Updating statistics");  
        }
        
        if (BotsChannel !== undefined) {
            BotsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`, "Updating statistics");
        }
    });

}