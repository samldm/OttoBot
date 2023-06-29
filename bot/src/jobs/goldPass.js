const Client = require("../structure/Client");

module.exports = {
    id: "goldPass",
    expr: "*/1 * * * *",

    /**
     * 
     * @param {Client} client 
     */
    func: async (client) => {
        let res = await client.api.getGoldPass()

        let endDate = new Date(res.goldPass.endTime);
        let now = new Date();
        let diff = endDate.getTime() - now.getTime();
        if (diff < 0) return;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        let minutes = Math.floor(diff / (1000 * 60)) % 60;
        
        let timeLeft = `**${days}** jours, **${hours}** heures, et **${minutes}** minutes`;
        client.api.guildCache.forEach((guild) => {
            if (guild.goldPassChannel != null) {
                client.channels.cache.get(guild.goldPassChannel).messages.fetch({ limit: 1 }).then(messages => {
                    let lastMessage = messages.first();
                    if (lastMessage == null) return;
                    if (lastMessage.author.id == client.user.id) {
                        lastMessage.edit(`> Il reste __${timeLeft}__ avant la fin du Gold Pass !`);
                    }
                });
            }
        });
    }
}