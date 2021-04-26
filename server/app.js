const express = require('express');
const dataRoute = require('./routes/data');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use('/api', dataRoute);

module.exports = app;
