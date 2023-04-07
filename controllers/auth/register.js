const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { joiRegister } = require('../../models/user')
const { Conflict, BadRequest } = require("http-errors");
const gravatar = require('gravatar');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const { error } = joiRegister.validate(req.body);
        if (error) {
            throw new BadRequest(error.message);
        }
    
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));    

    const avatarURL = gravatar.url(email)
        
    const newUser = await User.create({name, email, password: hashPassword, avatarURL});

    res.status(201).json({
        status: "success",
        code: 201,
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatar: newUser.avatarURL
        }
      })
    } catch (error) {
        next(error);
    }
}

module.exports = register;