const { Contact } = require("../../models/contact");
const isValidObjectId = require("../../services/mongoIdValidation");

const removeContact = async (contactId) => {
  if (!isValidObjectId(contactId)) {
         return null;
    }
  const contactToDelete = await Contact.findByIdAndRemove({_id: contactId})
    if (!contactToDelete) {
          return null;
      }
    return contactToDelete;
}

module.exports = removeContact;