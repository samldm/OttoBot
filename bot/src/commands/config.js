const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const AdvancedClient = require('../structure/Client');

module.exports = {
    guilds: [], // Empty = Global command
    /**
     * 
     * @param {AdvancedClient} client 
     * @param {CommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        console.log(subcommand);
        let options = {};
        switch (subcommand) {
            case "admin_role":
                options = {
                    adminRole: interaction.options.getRole('role').id
                }

                let adminRoleRes = await client.api.putGuildAdminRole(interaction.guild.id, options.adminRole);
                
                if (adminRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle administrateur a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du rôle administrateur.", ephemeral: true });
                }
                break;
            
            case "delete_admin_role":
                let deleteAdminRoleRes = await client.api.deleteGuildAdminRole(interaction.guild.id);

                if (deleteAdminRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle administrateur a été supprimé avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la suppression du rôle administrateur.", ephemeral: true });
                }
                break;

            case "clan_role":
                options = {
                    clanTag: interaction.options.getString('clan'),
                    role: interaction.options.getRole('role').id
                }
                
                let clanRoleRes = await client.api.putGuildClanRole(interaction.guild.id, { clanTag: options.clanTag, role: options.role });

                if (clanRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du rôle.", ephemeral: true });
                }
                break;
            
            case "delete_clan_role":
                options = {
                    clanTag: interaction.options.getString('clan')
                }

                let deleteClanRoleRes = await client.api.deleteGuildClanRole(interaction.guild.id, options.clanTag);

                if (deleteClanRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle a été supprimé avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la suppression du rôle.", ephemeral: true });
                }
                break;

            case "th_role":
                options = {
                    thLevel: interaction.options.getInteger('th'),
                    role: interaction.options.getRole('role').id
                }

                let thRoleRes = await client.api.putGuildThRole(interaction.guild.id, { th: options.thLevel, role: options.role });

                if (thRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du rôle.", ephemeral: true });
                }
                break;
            
            case "delete_th_role":
                options = {
                    thLevel: interaction.options.getInteger('th')
                }

                let deleteThRoleRes = await client.api.deleteGuildThRole(interaction.guild.id, options.thLevel);

                if (deleteThRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle a été supprimé avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la suppression du rôle.", ephemeral: true });
                }
                break;
            
            case "gold_pass_channel":
                options = {
                    channel: interaction.options.getChannel('channel').id
                }

                let goldPassChannelRes = await client.api.putGuildGoldPassChannel(interaction.guild.id, options.channel);

                if (goldPassChannelRes.status == "ok") {
                    interaction.reply({ content: "> Le salon a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du salon.", ephemeral: true });
                }
                break;
            
            case "delete_gold_pass_channel":
                let deleteGoldPassChannelRes = await client.api.deleteGuildGoldPassChannel(interaction.guild.id);

                if (deleteGoldPassChannelRes.status == "ok") {
                    interaction.reply({ content: "> Le salon a été supprimé avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la suppression du salon.", ephemeral: true });
                }
                break;
            
            default:
                interaction.reply({ content: "> Une erreur est survenue.", ephemeral: true });
                break;
        }
    }
}