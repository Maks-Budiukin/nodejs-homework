const express = require('express');
const {auth: ctrl} = require("../../controllers/");
const router = express.Router();
const { auth, upload } = require('../../middlewares/')

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', auth, ctrl.current);

router.get('/logout', auth, ctrl.logout);

router.patch('/avatars', auth, upload.single("avatar"), ctrl.addAvatar);

router.get('/verify/:verificationToken', ctrl.veryfyEmail);

router.post('/verify', ctrl.doubleVerifyEmail)

module.exports = router;