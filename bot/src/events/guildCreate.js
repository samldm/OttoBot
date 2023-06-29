const AdvancedClient = require("../structure/Client");
const { Guild } = require('discord.js');
const Logger = require("../utils/Logger");
module.exports = {
  name: "guildCreate",
  /**
   * 
   * @param {AdvancedClient} client
   * @param {Guild} guild 
   */
  execute: (client, guild) => {
    client.api.getGuild(guild.id).then((res) => {
      if (res.status == "ok") {

      } else {
        client.api.postGuild(guild.id, guild.ownerId).then((res) => {
            if (res.status != "ok") {
                Logger.error(`An error occured while creating guild '${guild.id}'.`);
                guild.leave();
            }
        })
      }
    })
  }
}