const {Router} = require('express');
const router = Router();

let goldPass = null;

module.exports = (cocClient) => {
    const user = require('./user')(cocClient);
    const guild = require('./guild')(cocClient);
    const clan = require('./clan')(cocClient);
    const stats = require('./stats')(cocClient);

    router.use('/user', user);
    router.use('/clan', clan);
    router.use('/guild', guild);
    router.use('/stats', stats);

    router.get('/goldPass', async (req, res) => {
        if (goldPass == null)
            goldPass = await cocClient.getGoldPassSeason();
        res.send({ status: "ok", goldPass });
    });

    return router;
};