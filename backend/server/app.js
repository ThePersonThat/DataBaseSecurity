const express = require('express');
const dataRoute = require('./routes/router');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport)

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', dataRoute);

module.exports = app;
