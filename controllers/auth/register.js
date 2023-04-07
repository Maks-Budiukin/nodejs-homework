const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { joiRegister } = require('../../models/user')
const { Conflict, BadRequest } = require("http-errors");
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const sendEmail = require('../../services/sendEmail')

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
    
    const verificationToken = v4();
        
    const newUser = await User.create({ name, email, password: hashPassword, avatarURL, verificationToken });
    
        
    const mail = {
        to: email,
        subject: "Verify your mail!",
        html: `<a target="_blank" href="http://localhost:3000/api/users/veryfy/${verificationToken}">Click me to verify!</a>` 
    };

    sendEmail(mail);
        
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