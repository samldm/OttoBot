const {Schema, model } = require('mongoose');

const UserSchema = new Schema({
    discordId: { type: String, required: true },
    cocTag: { type: String, required: true },
    cocName: { type: String },
    clanTag: { type: String },
    clanName: { type: String },
    clanRole: { type: String },
    lastUpdated: { type: Date },
    stats: [{
        date: { type: Date },
        trophies: { type: Number },
        bbTrophies: { type: Number },
        warStars: { type: Number },
        thLevel: { type: Number },
        bbLevel: { type: Number },
        donations: { type: Number },
        troops: [{
            name: { type: String },
            level: { type: Number },
            village: { type: String }
        }],
        heroes: [{
            name: { type: String },
            level: { type: Number },
            village: { type: String }
        }],
    }]
});

module.exports = model('User', UserSchema);