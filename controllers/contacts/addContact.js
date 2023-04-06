const { Contact } = require("../../models");
const { joiAdd } = require("../../models/contact");

const addContact = async (req, res, next) => {
    try {
        const { _id } = req.user;
    const { body } = req;
    const { error } = joiAdd.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.create({...body, owner: _id});
    res.status(201).json({
        status: "success",
        code: 201,
        result: newContact,
      })
    } catch (error) {
        next(error)
    }
}

module.exports = addContact;