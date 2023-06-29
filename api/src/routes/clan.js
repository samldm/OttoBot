const {Router} = require('express');
const router = Router();
const { Clan } = require('../db');

async function updateClanStats(cocClient, clan) {
    if (clan.lastUpdated == null || Date.now() - clan.lastUpdated >= (15 * 60 * 1000)) {
        let cland = await cocClient.getClan(clan.tag);
        if (cland == null) {
            return false;
        }
        console.log(cland);
        clan.lastUpdated = Date.now();

        clan.name = cland.name;
        clan.description = cland.description;
        clan.level = cland.level;
        clan.trophies = cland.points;
        clan.bTrophies = cland.versusPoints;
        clan.thRequirement = cland.requiredTownHallLevel;
        clan.trRequirement = cland.requiredTrophies;
        clan.btrRequirement = cland.requiredVersusTrophies;
        await clan.save(); 
    }
    return true;
}

module.exports = (cocClient) => {
    router.get('/:tag', async (req, res) => {
        let { tag } = req.params;
        tag = '#' + tag.toUpperCase();
        const clan = await Clan.findOne({ tag });
        if (clan == null) {
            res.status(404).send({ status: "clan not found" });
            return;
        }
        if (!await updateClanStats(cocClient, clan)) {
            res.status(500).send({ status: "error updating clan" });
            return;
        }
        res.send({ status: "ok", clan });
    });
    
    router.put('/:tag', async (req, res) => {
        let { tag } = req.params;

        if (tag == null) {
            res.status(400).send({ status: "missing clan tag" });
            return;
        }
        tag = '#' + tag.toUpperCase();
        if (await Clan.findOne({ tag }) != null) {
            res.status(409).send({ status: "clan already exists" });
            return;
        }
        let clan = new Clan({
            tag: tag
        });
        if (!await updateClanStats(cocClient, clan)) {
            res.status(500).send({ status: "error updating clan" });
            return;
        }

        res.send({ status: "ok", clan });
    });

    return router;
};