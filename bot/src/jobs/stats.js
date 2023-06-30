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
        })
    }
}