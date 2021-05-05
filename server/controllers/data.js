const pgClient = require('../models/pg-database')

module.exports.getData = async (req, res) => {
    const tournament = await pgClient.query('SELECT * FROM TOURNAMENT');
    const race = await pgClient.query('SELECT * FROM RACE');

    const response = {
        tournaments: tournament.rows,
        races: race.rows
    };

    res.status(200).json(response);
}
