const {User} = require("../../models")
const {NotFound} = require('http-errors')

const veryfyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = User.findOne({ verificationToken });
        if (!user) {
            throw new NotFound();
        }

        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null })
        res.json({
            message: "Verification successful!"
        })
    } catch (error) {
        next(error);
    }
}

module.exports = veryfyEmail;