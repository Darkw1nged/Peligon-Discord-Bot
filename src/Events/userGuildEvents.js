const UMessage = require('../Libraries/Utils/UMessage');

module.exports = async (client) => {

    client.on('guildMemberAdd', async (member) => {
        if (member.user.bot) return;
        const message = await UMessage.ServerJoin(member.guild).replaceAll('{member}', member);
        console.log(message);

        const privateMessage = await UMessage.PrivateJoin(member.guild).replaceAll('{member}', member);
        member.send(privateMessage);
    });

    client.on('guildMemberRemove', async (member) => {
        if (member.user.bot) return;
        const message = await UMessage.ServerQuit(member.guild).replaceAll('{member}', member);
        console.log(message);
    });

}