"use strict";
const { Client } = require('pg');
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ticketbook',
    user: 'postgres',
    password: '123456'
});
client.connect((err) => {
    if (err) {
        console.log('connection error', err.stack);
    }
    else {
        console.log('connected');
    }
});
module.exports = client;
