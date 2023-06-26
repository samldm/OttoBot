const {Router} = require('express');
const router = Router();


module.exports = (cocClient) => {
    router.get('/:id', async (req, res) => {
        res.send({ status: "ok" });
    });
    
    router.put('/:id', (req, res) => {
        res.send({ status: "ok" });
    });

    return router;
};