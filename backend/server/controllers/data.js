const pgClient = require('../models/pg-database');

module.exports.getData = async (req, res) => {
    const limit = req.query.pagesize;
    const offset = req.query.offset;

    const tournament = await pgClient.query('SELECT * FROM TOURNAMENT');
    const tournamentCount = await pgClient.query('SELECT COUNT(*) FROM TOURNAMENT');

    const race = await pgClient.query('SELECT * FROM RACE OFFSET $1 LIMIT $2', [offset, limit]);
    const raceCount = await pgClient.query('SELECT COUNT(*) FROM RACE');

    const response = {
        tournaments: tournament.rows,
        tournamentCount: tournamentCount.rows[0].count,
        races: race.rows,
        raceCount: raceCount.rows[0].count
    };

    res.status(200).json(response);
}

module.exports.update = async (req, res) => {
    try {
        let data = [];
        let query = `UPDATE ${req.body.table} SET`;
        let index = 1;

        for (let element of req.body.element) {
            data.push(element.value);
            query += ` ${element.name} = $${index},`;
            index++;
        }

        data.push(req.body.id.value);
        query = query.slice(0, -1);
        query += ` WHERE ${req.body.id.name} = $${index}`;

        await pgClient.query(query, [...data]);

        res.status(200).json({
            message: 'ok'
        });
    } catch (e) {
        res.status(409).json({
            message: e.message
        })
    }
}
