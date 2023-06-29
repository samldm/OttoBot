require('dotenv').config();
const PORT = process.env.PORT || 3000;
const DEBUG = true;

const express = require('express');

const mongoose = require('./db/connect')();

const { Client } = require('clashofclans.js');
const cocClient = new Client({
    restRequestTimeout: 5000,
    retryLimit: 2,
});

(async () => {
    await cocClient.login({ email: process.env.COC_API_EMAIL, password: process.env.COC_API_PASSWORD });

    const app = express();
    
    app.use((req, res, next) => {
        if (DEBUG) {
            console.log(`[${req.method}] ${req.path} ${req.body != null ? '*' : ''}`);
        }
        next();
    });

    const routes = require('./routes/Router')(cocClient);

    app.use(express.json());

    app.use('/', routes);

    app.listen(PORT, () => console.log('Server running on port ' + PORT));
})();