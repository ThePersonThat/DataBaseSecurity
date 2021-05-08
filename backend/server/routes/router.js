const express = require('express');
const dataController = require('../controllers/data');
const authController = require('../controllers/auth');
const passport = require('passport');
const router = express.Router();

router.get('/data', passport.authenticate('jwt', {session: false}), dataController.getData);
router.post('/login', authController.login);

module.exports = router;
