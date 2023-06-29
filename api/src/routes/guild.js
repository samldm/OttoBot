const {Router} = require('express');
const { Guild } = require('../db');
const router = Router();


module.exports = (cocClient) => {
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        res.send({ status: "ok", guild });
    });
    
    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { ownerID } = req.body;
        if (ownerID == null) {
            res.status(400).send({ status: "missing owner id in body" });
            return;
        }
        if (await Guild.findOne({ guildID: id }) != null) {
            res.status(409).send({ status: "guild already exists" });
            return;
        }
        let guild = new Guild({
            guildID: id,
            ownerID: ownerID
        });
        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.put('/:id/adminRole', async (req, res) => {
        const { id } = req.params;
        const { adminRole } = req.body;
        if (adminRole == null) {
            res.status(400).send({ status: "missing admin role in body" });
            return;
        }
        let guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        guild.adminRole = adminRole;
        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.delete('/:id/adminRole', async (req, res) => {
        const { id } = req.params;
        let guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        guild.adminRole = null;
        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.put('/:id/clanRoles', async (req, res) => {
        const { id } = req.params;
        const { clanRoles } = req.body;
        if (clanRoles == null) {
            res.status(400).send({ status: "missing clan roles in body" });
            return;
        }
        let guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        if (!Array.isArray(clanRoles)) {
            res.status(400).send({ status: "clan roles must be an array" });
            return;
        }
        if (guild.clanRoles == null) {
            guild.clanRoles = [];
        }
        clanRoles.forEach(role => {
            if (role.clanTag != null && role.role != null) {
                if (!guild.clanRoles.includes(role)) {
                    guild.clanRoles.push(role);
                }
            }
        });

        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.delete('/:id/clanRoles', async (req, res) => {
        const { id } = req.params;
        const { tag } = req.body;
        if (tag == null) {
            res.status(400).send({ status: "missing clan tag in body" });
            return;
        }

        let guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        if (guild.clanRoles == null) {
            res.status(404).send({ status: "clan roles not set" });
            return;
        }
        if (Array.isArray(tag)) {
            tag.forEach(t => {
                guild.clanRoles = guild.clanRoles.filter(role => role.clanTag != t);
            });
        } else {
            guild.clanRoles = guild.clanRoles.filter(role => role.clanTag != tag);
        }
        await guild.save();
        res.send({ status: "ok", guild });
    });


    router.put('/:id/thRoles', async (req, res) => {
        const { id } = req.params;
        const { clanRoles: thRoles } = req.body;
        if (thRoles == null) {
            res.status(400).send({ status: "missing th roles in body" });
            return;
        }
        let guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        if (!Array.isArray(thRoles)) {
            res.status(400).send({ status: "th roles must be an array" });
            return;
        }
        if (guild.clanRoles == null) {
            guild.clanRoles = [];
        }
        thRoles.forEach(role => {
            if (role.clanTag != null && role.role != null) {
                if (!guild.clanRoles.includes(role)) {
                    guild.clanRoles.push(role);
                }
            }
        });
        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.delete('/:id/thRoles', async (req, res) => {
        const { id } = req.params;
        const { th } = req.body;
        if (th == null) {
            res.status(400).send({ status: "missing th in body" });
            return;
        }

        let guild = await Guild.findOne({ guildID: id });
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        if (guild.thRoles == null) {
            res.status(404).send({ status: "th roles not set" });
            return;
        }
        if (Array.isArray(th)) {
            th.forEach(t => {
                guild.clanRoles = guild.clanRoles.filter(role => role.th != t);
            });
        } else {
            guild.clanRoles = guild.clanRoles.filter(role => role.th != th);
        }
        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.put('/:id/goldPassChannel', async (req, res) => {
        const { id } = req.params;
        const { channelID } = req.body;
        if (channelID == null) {
            res.status(400).send({ status: "missing channel id in body" });
            return;
        }
        let guild = await Guild.findOne({ guildID: id }) == null;
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        guild.goldPassChannel = channelID;
        await guild.save();
        res.send({ status: "ok", guild });
    });

    router.delete('/:id/goldPassChannel', async (req, res) => {
        const { id } = req.params;
        const { channelID } = req.body;
        if (channelID == null) {
            res.status(400).send({ status: "missing channel id in body" });
            return;
        }
        let guild = await Guild.findOne({ guildID: id }) == null;
        if (guild == null) {
            res.status(404).send({ status: "guild not found" });
            return;
        }
        guild.goldPassChannel = null;
        await guild.save();
        res.send({ status: "ok", guild });
    });

    return router;
};