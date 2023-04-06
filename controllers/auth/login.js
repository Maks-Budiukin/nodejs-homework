const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const { joiLogin } = require('../../models/user');
const { Unauthorized, BadRequest } = require("http-errors");
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = joiLogin.validate(req.body);
        if (error) {
            throw new BadRequest(error.message);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Unauthorized("Email or password is wrong");
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Unauthorized("Email or password is wrong");
        }
        
        const payload = {
            id: user._id
        };
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            status: "success",
            code: 200,
            result: {
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription
                }
            }
})
    
    } catch (error) {
        next(error);
    }
}

module.exports = login;