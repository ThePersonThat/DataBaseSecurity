const express = require('express');
const dataController = require('../controllers/data');
const authController = require('../controllers/auth');
const passport = require('passport');
const router = express.Router();

router.get('/data', passport.authenticate('jwt', {session: false}), dataController.getData);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/change', authController.changePassword);

module.exports = router;
