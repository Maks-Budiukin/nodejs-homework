const login = require('./login');
const logout = require('./logout');
const register = require("./register");
const current = require('./current');
const addAvatar = require('./addAvatar');
const veryfyEmail = require('./verifyEmail');
const doubleVerifyEmail = require('./doubleVerifyEmail')

module.exports = {
    login,
    logout,
    register,
    current,
    addAvatar,
    veryfyEmail,
    doubleVerifyEmail
}