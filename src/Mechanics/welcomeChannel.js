const { MessageEmbed } = require('discord.js')

module.exports = async (client) => {

    async function sendEmbed() {
        const channel = client.guilds.cache.get('903319147017039882').channels.cache.get('912824493280477245');

        const messageSent = true;
        if (!messageSent) {
            const welcomeEmbed = new MessageEmbed()
                .setColor("#ffffff")
                .setDescription("Welcome to my awesome server!")
            
            channel.send({ embeds: [welcomeEmbed] });
        }

        const message = await channel.messages.fetch('1019630234221428786');
        message.react('🔨');
    }

    sendEmbed();

}