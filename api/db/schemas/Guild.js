const {Schema, model } = require('mongoose');

const GuildSchema = new Schema({
    ownerID: { type: String, required: true },
    guildID: { type: String, required: true },
    adminRole: { type: String },
    clanRoles: { type: Array },
    thRoles: { type: Array },
    goldpassChannel: { type: String },
});

module.exports = model('Guild', GuildSchema);