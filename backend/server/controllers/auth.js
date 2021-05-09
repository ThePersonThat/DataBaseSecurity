const pgClient = require('../models/pg-database');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

module.exports.login = async (req, res) => {
    const user = {
        login: req.body.login,
        password: req.body.password
    };

    const exist = await pgClient.query('SELECT * FROM USERS WHERE LOGIN = $1', [user.login]);

    if (exist.rows.length > 0) {
        const result = bcrypt.compareSync(user.password, exist.rows[0].hash);

        if (result) {
            const token = jwt.sign({
                login: user.login
            }, config.jwtKey, {expiresIn: config.jwtExpires});

            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            res.status(401).json({
                message: 'Wrong login or password. Check your input'
            });
        }
    } else {
        res.status(401).json({
            message: 'Wrong login or password. Check your input'
        });
    }
}

module.exports.register = async (req, res) => {
    const user = {
        login: req.body.login,
        password: req.body.password
    };

    const exist = await pgClient.query('SELECT 1 exist FROM USERS WHERE LOGIN = $1', [user.login]);

    if (exist.rows.length > 0) {
        res.status(409).json({
            message: 'This login is already taken'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = user.password;

        await pgClient.query('INSERT INTO USERS (LOGIN, HASH) VALUES ($1, $2)',
            [user.login, bcrypt.hashSync(password, salt)]);

        res.status(200);
    }
}

module.exports.changePassword = async (req, res) => {
    const user = {
        login: req.body.login,
        password: req.body.password,
        newPassword: req.body.newPassword
    };

    const userData = await pgClient.query('SELECT * FROM USERS WHERE LOGIN = $1', [user.login]);

    if (userData.rows.length > 0) {
        const result = bcrypt.compareSync(user.password, userData.rows[0].hash);

        if (result) {
            const salt = bcrypt.genSaltSync(10);
            const password = user.newPassword;

            await pgClient.query('UPDATE USERS SET HASH = $1 WHERE LOGIN = $2',
                [bcrypt.hashSync(password, salt), user.login]);

            res.status(200);
        } else {
            res.status(404).json({
                message: 'Wrong login or password. Check your input'
            });
        }
    } else {
        res.status(404).json({
            message: 'Wrong login or password. Check your input'
        });
    }
}
