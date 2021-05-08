const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config/config');
const pgClient = require('../models/pg-database')

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtKey
};

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done) => {
            const user = await pgClient.query('SELECT * FROM USERS WHERE LOGIN = $1', [payload.login]);

            if (user.rows.length > 0) {
                done(null, user.rows[0].login);
            }
            else {
                done(null, false);
            }
        })
    )
}
