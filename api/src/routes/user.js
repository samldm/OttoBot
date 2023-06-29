const {Router} = require('express');
const router = Router();
const { User } = require('../db'); 

async function updateUserStats(cocClient, user) {
    if (user.lastUpdated == null || Date.now() - user.lastUpdated >= (15 * 60 * 1000)) {
        let player = await cocClient.getPlayer(user.cocTag);
        if (player == null) {
            return false;
        }
        user.lastUpdated = Date.now();

        if (player.name != user.name) {
            user.name = player.name;
        }

        if (player.clan != null && player.clan.tag != user.clanTag) {
            user.clanTag = player.clan.tag;
            user.clanName = player.clan.name;
            user.clanRole = player.role;
        }

        if (user.stats == null) {
            user.stats = [];
        }
        user.stats.push({
            date: Date.now(),
            trophies: player.trophies,
            bbTrophies: player.builderHallTrophies,
            warStars: player.warStars,
            thLevel: player.townHallLevel,
            bbLevel: player.builderHallLevel,
            donations: player.donations,
            troops: player.troops.map(troop => {
                return {
                    name: troop.name,
                    level: troop.level,
                    village: troop.village
                };
            }),
            heroes: player.heroes.map(hero => {
                return {
                    name: hero.name,
                    level: hero.level,
                    village: hero.village
                };
            })
        });
        await user.save();
    }
    return true;
}

module.exports = (cocClient) => {
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne({ discordId: id });
        if (user == null) {
            res.status(404).send({ status: "user not found" });
            return;
        }
        if (user.lastUpdated == null || user.lastUpdated < Date.now()) {
            if (!await updateUserStats(cocClient, user)) {
                res.status(500).send({ status: "error updating user stats" });
                return;
            }
        }
        res.send({ status: "ok", user });
    });
    
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { cocTag } = req.body;

        if (cocTag == null) {
            res.status(400).send({ status: "missing coc tag in body" });
            return;
        }

        if (await User.findOne({ discordId: id }) != null) {
            res.status(409).send({ status: "user already exists" });
            return;
        }
        let user = new User({
            discordId: id,
            cocTag: cocTag
        });
        if (!await updateUserStats(cocClient, user)) {
            res.status(500).send({ status: "error updating user stats" });
            return;
        }

        res.send({ status: "ok", user });
    });

    return router;
};