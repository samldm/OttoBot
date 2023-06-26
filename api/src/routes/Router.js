const {Router} = require('express');
const router = Router();

const user = require('./user');
const player = require('./player');
const guild = require('./guild');

router.use('/user', user);
router.use('/player', player);
router.use('/guild', guild);

module.exports = router;