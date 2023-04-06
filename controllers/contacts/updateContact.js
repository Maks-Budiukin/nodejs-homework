const { Contact } = require("../../models/contact");
const isValidObjectId = require("../../services/mongoIdValidation");
const { joiUpdate } = require("../../models/contact");
const { NotFound, BadRequest } = require('http-errors');

const updateContact = async (req, res, next) => {
    try {
      const { body } = req;
    const { error } = joiUpdate.validate(body);
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      throw new NotFound(`Contact with ID "${contactId}" not found!`)
      }
      
    const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
    if (!updatedContact) {
        throw error;
    }
    res.json({
        status: "success",
        code: 200,
        message: `Contact with ID ${updateContact.id} was updated!`,
        updatedContact,
      })
    } catch (error) {
      next(error)
    }
}

module.exports = updateContact;