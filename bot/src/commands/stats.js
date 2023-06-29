const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require('discord.js');
const AdvancedClient = require('../structure/Client');

module.exports = {
    guilds: [], // Empty = Global command
    /**
     * 
     * @param {AdvancedClient} client 
     * @param {CommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        let user = interaction.options.getUser('user');
        if (user == null) {
            user = interaction.user;
        }

        let userInfos = await client.api.getUser(user.id);
        if (userInfos.status == "user not found") {
            interaction.reply({ content: "> L'utilisateur n'a pas relié son compte.", ephemeral: true });
            return;
        }
        userInfos = userInfos.user;

        let stats = userInfos.stats.sort((a, b) => b.date - a.date);

        let embed = new EmbedBuilder()
            .setTitle(`Informations de ${userInfos.cocName} (${userInfos.cocTag})`)
            .setDescription(`HDV Niveau ${stats[0].thLevel}\nTrophées: ${stats[0].trophies}`)
            .setColor(0x00FF00)
        
        interaction.reply({ embeds: [embed] });
        let guild = await client.api.getGuild(interaction.guild.id);
        
        if (guild.status != "ok")
            return;
        let guildData = guild.guild;
        let member = interaction.guild.members.cache.get(user.id);
        
        console.log(guildData);
        guildData.clanRoles.forEach((role) => {
            if (userInfos.clanTag == role.clanTag && !member.roles.cache.has(role.role)) {
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