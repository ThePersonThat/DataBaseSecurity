const pgClient = require('../models/pg-database')

module.exports.getData = async (req, res) => {
    const result = await pgClient.query('SELECT * FROM A');

    res.status(200).json(result.rows);
}
