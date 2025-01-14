const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const addAvatar = async (req, res, next) => { 
    const { path: tempDir, originalname } = req.file;
    const { _id } = req.user;
    const uniqueAvatarName = `${_id}_${originalname}`;

    try {
        const resizedAvatar = await Jimp.read(tempDir);
        await resizedAvatar.resize(250, Jimp.AUTO);
        await resizedAvatar.writeAsync(tempDir);

        const resultUpload = path.join(avatarsDir, uniqueAvatarName);

        await fs.rename(tempDir, resultUpload);

        const avatarURL = path.join("public", "avatars", uniqueAvatarName);

        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({avatarURL})
    } catch (error) {
        await fs.unlink(tempDir);
        next(error)
    }
}

module.exports = addAvatar;