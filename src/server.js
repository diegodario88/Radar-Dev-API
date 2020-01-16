require('dotenv').config();
const express = require('express');
const mongoose = require('./database/database');

const app = express();
app.use(express.json());

const port = normalizePort(process.env.PORT || '4200');
app.listen(port);

//First ENDPOINT
app.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'OmniStack - Api',
        description: 'Provide Dev\'s information ',
        route: '/api/v1/devs',
        version: '1.0.0',
        author: 'Diego Dario'
    })
});

require('./routes')(app);


console.log('\x1b[32m', `OmniStack API is operating! port in use: ${port}`);

function normalizePort(val) {

    const port = parseInt(val, 10);

    if (isNaN(port)) return val;

    if (port >= 0) return port;

    return false;
}
