const current = async (req, res, next) => {
    try {
        const { name, email } = req.user;
        res.json({
            status: "success",
            code: 200,
            data: {
                name,
                email
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = current;