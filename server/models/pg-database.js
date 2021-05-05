const pg = require('pg');
const postgresURI = 'postgresql://alex:root@localhost:5432/test';
const client = new pg.Client(postgresURI);
client.connect()
    .then(
        () => console.log('Connected to database')
    )
    .catch(err => {
        console.log('Connection database error: ' + err.message);
        process.exit(1);
    });

module.exports = client;
