const {Router} = require('express');
const router = Router();

module.exports = (cocClient) => {
    const user = require('./user')(cocClient);
    const guild = require('./guild')(cocClient);
    const clan = require('./clan')(cocClient);

    router.use('/user', user);
    router.use('/clan', clan);
    router.use('/guild', guild);

    return router;
};