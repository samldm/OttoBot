const {Schema, model } = require('mongoose');

const UserSchema = new Schema({
    discordId: { type: String, required: true },
    cocTag: { type: String, required: true },
    clanTag: { type: String },
    th: { type: Number },
    trophies: { type: Number },
    bTrophies: { type: Number },
    level: { type: Number },
});

module.exports = model('User', UserSchema);