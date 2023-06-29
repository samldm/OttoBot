const {Schema, model } = require('mongoose');

const ClanSchema = new Schema({
    tag: { type: String, required: true },
    name: { type: String },
    lastUpdated: { type: Date },
    description: { type: String },
    level: { type: Number },
    trophies: { type: Number },
    bTrophies: { type: Number },
    thRequirement: { type: Number },
    trRequirement: { type: Number },
    btrRequirement: { type: Number },
});

module.exports = model('Clan', ClanSchema);