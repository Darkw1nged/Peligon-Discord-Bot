module.exports = async (client) => {

    client.on('messageReactionAdd', async (reaction, user) => {
        const message = reaction.message;
        if (message.id === '1019630234221428786') {
            const guild = reaction.message.guild;
            const member = guild.members.cache.get(user.id);
            const role = guild.roles.cache.find(role => role.id === "910650938476363846");
            
            if (member.roles.cache.has(role.id)) {
                member.roles.remove(role);
            } else {
                member.roles.add(role);
            }

            message.reactions.resolve("🔨").users.remove(user.id);
        }
    });

}