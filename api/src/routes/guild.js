const {Router} = require('express');
const router = Router();


router.get('/:id', (req, res) => {
    res.send({ status: "ok" });
});

router.put('/:id', (req, res) => {
    res.send({ status: "ok" });
});

module.exports = router;