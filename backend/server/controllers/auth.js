const pgClient = require('../models/pg-database');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.login = async (req, res) => {
    const user = {
        login: req.body.login,
        password: req.body.password
    };

    const exist = await pgClient.query('SELECT 1 exist FROM USERS WHERE LOGIN = $1 AND PASSWORD = $2',
        [user.login, user.password]);

    if(exist.rows.length > 0) {
        const token = jwt.sign({
           login: user.login
        }, config.jwtKey, {expiresIn: config.jwtExpires});

        res.status(200).json({
            token: `Bearer ${token}`
        });
    }
    else {
        res.status(401).json({
            message: 'unauthorized'
        });
    }
}
