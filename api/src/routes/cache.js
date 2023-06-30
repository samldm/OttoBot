const {Router} = require('express');
const { Guild } = require('../db');
const router = Router();

let channelsCache = {};
let rolesCache = {};

module.exports = (cocClient) => {
    router.get('/roles/:id', async (req, res) => {
        const { id } = req.params;
        if (rolesCache[id]) {
            res.send({ status: "ok", roles: rolesCache[id] });
        } else {
            res.status(404).send({ status: "not found" });
        }
    });

    router.get('/channels/:id', async (req, res) => {
        const { id } = req.params;
        if (channelsCache[id]) {
            res.send({ status: "ok", channels: channelsCache[id] });
        } else {
            res.status(404).send({ status: "not found" });
        }
    });

    router.put('/roles/:id', async (req, res) => {
        const { id } = req.params;
        const { roles } = req.body;
        if (roles == null) {
            res.status(400).send({ status: "missing roles in body" });
            return;
        }
        rolesCache[id] = roles;
        res.send({ status: "ok", roles });
    });

    router.put('/channels/:id', async (req, res) => {
        const { id } = req.params;
        const { channels } = req.body;
        if (channels == null) {
            res.status(400).send({ status: "missing channels in body" });
            return;
        }
        channelsCache[id] = channels;
        res.send({ status: "ok", channels });
    });
    return router;
};