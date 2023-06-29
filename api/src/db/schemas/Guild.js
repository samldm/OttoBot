const {Schema, model } = require('mongoose');

const GuildSchema = new Schema({
    ownerID: { type: String, required: true },
    guildID: { type: String, required: true },
    adminRole: { type: String },
    clanRoles: [{
        clanTag: { type: String, required: true },
        role: { type: String, required: true },
    }],
    thRoles: [{
        th: { type: Number, required: true },
        role: { type: String, required: true },
    }],
    goldpassChannel: { type: String },
});

module.exports = model('Guild', GuildSchema);