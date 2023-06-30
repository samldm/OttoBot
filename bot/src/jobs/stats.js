const Client = require("../structure/Client");
const { formatUptime } = require("../utils/utils.js");

module.exports = {
    id: "stats",
    expr: "*/10 * * * *",

    /**
     * 
     * @param {Client} client 
     */
    func: async (client) => {
        client.api.putStats({
            guilds: client.guilds.cache.size,
            users: client.users.cache.size,
            uptime: formatUptime(client.uptime)
        });
        client.guilds.cache.forEach(async (guild) => {
            await guild.roles.fetch();
            await guild.channels.fetch();
            client.api.putRoles(guild.id, guild.roles.cache.map((role) => ({ id: role.id, name: role.name})));
            client.api.putChannels(guild.id, guild.channels.cache.map((channel) => ({ id: channel.id, name: channel.name})));
        });
    }
}