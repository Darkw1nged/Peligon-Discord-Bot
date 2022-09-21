const channelUtils = require('../Libraries/Utils/channelUtls');

module.exports = async (client) => {

    function format(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    const ServerTotalChannel = client.channels.cache.get(await channelUtils.getServerTotalChannel);
    const HumansChannel = client.channels.cache.get(await channelUtils.getHumansChannel);
    const BotsChannel = client.channels.cache.get(await channelUtils.getBotsChannel);

    client.on('guildMemberRemove', async member => {
        ServerTotalChannel.setName(`Server Total: ${guild.memberCount.toLocaleString()}`, "Updating statistics");
        HumansChannel.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`, "Updating statistics");
        BotsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`, "Updating statistics");
    });
    
    client.on('guildMemberAdd', async member => {
        ServerTotalChannel.setName(`Server Total: ${guild.memberCount.toLocaleString()}`, "Updating statistics");
        HumansChannel.setName(`Humans: ${guild.members.cache.filter(member => !member.user.bot).size}`, "Updating statistics");
        BotsChannel.setName(`Bots: ${guild.members.cache.filter(member => member.user.bot).size}`, "Updating statistics");    
    });

}