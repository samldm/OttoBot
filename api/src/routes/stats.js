const {Router} = require('express');
const { Guild } = require('../db');
const router = Router();

let stats = {
    users: 0,
    guilds: 0,
    uptime: "0s"
}

let commandList;

module.exports = (cocClient) => {
    router.get('/', async (req, res) => {
        res.send({ status: "ok", stats });
    });

    router.get('/commands', async (req, res) => {
        console.log(commandList)
        res.send({ status: "ok", commands: commandList });
    });
    
    router.put('/', async (req, res) => {
        const { users, guilds, uptime, commands } = req.body;
        if (commands != null) {
            commandList = commands;
        }
        stats.users = users;
        stats.guilds = guilds;
        stats.uptime = uptime;
        res.send({ status: "ok", stats });
    });
    return router;
};