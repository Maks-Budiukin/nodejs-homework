const { User } = require('../../models')
const {Unauthorized} = require('http-errors')

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const user = await User.findByIdAndUpdate(_id, { token: null });
        if (!user) {
            throw new Unauthorized("Not authorized");
        }
        res.status(204).json();
    } catch (error) {
        next(error)
    }
}

module.exports = logout;