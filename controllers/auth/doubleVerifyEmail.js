const { joiVerify, User } = require('../../models/user');
const { BadRequest, NotFound } = require('http-errors');
const sendEmail = require('../../services/sendEmail');


const doubleVerifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

    const { error } = joiVerify.validate(req.body);
        if (error) {
            throw new BadRequest(error.message);
    }
    
        const user = await User.findOne({ email });
        if (!user) {
            throw new NotFound("User with such email not found. Please, register!");
        }

        if (user.verify) {
            throw new BadRequest("Verification has already been passed");
        }

        const mail = {
            to: email,
            subject: "Verify your mail!",
            html: `<a target="_blank" href="http://localhost:3000/api/users/veryfy/${user.verificationToken}">Click me to verify!</a>` 
        };

    sendEmail(mail);
    
    res.json({
        status: "success",
        code: 200,
        message: "Verification email sent"
    })
    } catch (error) {
        next(error);
    }
}

module.exports = doubleVerifyEmail;