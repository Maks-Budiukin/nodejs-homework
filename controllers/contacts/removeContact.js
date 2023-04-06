const { Contact } = require("../../models/contact");
const isValidObjectId = require("../../services/mongoIdValidation");
const { NotFound } = require('http-errors');

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw new NotFound(`Contact with ID "${contactId}" not found!`)
  }
  const contactToDelete = await Contact.findByIdAndRemove({_id: contactId})
    if (!contactToDelete) {
      throw new NotFound(`Contact with ID "${contactId}" not found!`)
    }
    res.json({
        status: "success",
        code: 200,
        message: `Contact with ID ${contactToDelete.id} was deleted!`,
        deletedContact: contactToDelete,
      })
  } catch (error) {
      next(error);
  }    
}

module.exports = removeContact;