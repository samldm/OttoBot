require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();
const routes = require('./routes/Router');

app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => console.log('Server running on port ' + PORT));