const { Contact } = require("../../models/contact");
const isValidObjectId = require("../../services/mongoIdValidation");
const { joiUpdateStatus } = require("../../models/contact");
const { NotFound, BadRequest } = require('http-errors');

const updateStatusContact = async (req, res, next) => {
    try {
      const { body } = req;
    const { error } = joiUpdateStatus.validate(body);
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
      throw new NotFound(`Contact with ID "${contactId}" not found!`)
    }
    const updatedContact = await Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
      if (!updatedContact) {
      throw new NotFound(`Contact with ID "${contactId}" not found!`)
    }
    res.json({
        status: "success",
        code: 200,
        message: `Contact with ID ${updatedContact.id} was updated!`,
        updatedContact: updatedContact,
      })
    } catch (error) {
      next(error);
    }
}

module.exports = updateStatusContact;