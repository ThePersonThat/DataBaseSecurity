const pgClient = require('../models/pg-database');

module.exports.getData = async (req, res) => {
    const limit = req.query.pagesize;
    const offset = req.query.offset;

    const tournament = await pgClient.query('SELECT * FROM TOURNAMENT OFFSET ' + offset + ' LIMIT ' + limit);
    const tournamentCount = await pgClient.query('SELECT COUNT(*) FROM TOURNAMENT');

    const race = await pgClient.query('SELECT * FROM RACE OFFSET ' + offset + ' LIMIT ' + limit);
    const raceCount = await pgClient.query('SELECT COUNT(*) FROM RACE');

    const response = {
        tournaments: tournament.rows,
        tournamentCount: tournamentCount.rows[0].count,
        races: race.rows,
        raceCount: raceCount.rows[0].count
    };

    res.status(200).json(response);
}
