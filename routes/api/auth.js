const express = require('express');
const {auth: ctrl} = require("../../controllers/");
const router = express.Router();
const { auth } = require('../../middlewares/')

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', auth, ctrl.current);

router.get('/logout', auth, ctrl.logout);

module.exports = router;