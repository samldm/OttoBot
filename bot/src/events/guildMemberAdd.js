const AdvancedClient = require("../structure/Client");
const { GuildMember } = require('discord.js');
const Logger = require("../utils/Logger");
module.exports = {
  name: "guildMemberAdd",
  /**
   * 
   * @param {AdvancedClient} client
   * @param {GuildMember} member  
   */
  execute: async (client, member) => {
    let guild = await client.api.getGuild(member.guild.id);
    if (guild.status != "ok")
        return;
    let guildData = guild.guild;

    let user = await client.api.getUser(member.id);
    if (user.status != "ok")
        return;
    let userData = user.user;
    let stats = userData.stats.sort((a, b) => b.date - a.date);

    guildData.clanRoles.forEach((role) => {
        if (userData.clanTag == role.clanTag && !member.roles.cache.has(role.role)) {
            member.roles.add(role.role);
        } else if (member.roles.cache.has(role.role)) {
            member.roles.remove(role.role);
        }
    });

    guildData.thRoles.forEach((role) => {
        if (stats[0].thLevel == role.th && !member.roles.cache.has(role.role)) {
            member.roles.add(role.role);
        } else if (member.roles.cache.has(role.role)) {
            member.roles.remove(role.role);
        }
    });
  }
}