const pg = require('pg');
const config = require('../config/config')
const client = new pg.Client(config.postgresURI);

client.connect()
    .then(
        () => console.log('Connected to database')
    )
    .catch(err => {
        console.log('Connection database error: ' + err.message);
        process.exit(1);
    });

module.exports = client;
