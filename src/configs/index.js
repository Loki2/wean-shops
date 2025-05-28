const { Client } = require('pg');

const client = new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password: "root",
    database: "3slaos"
});

module.exports = client;