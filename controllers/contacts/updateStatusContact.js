const { Contact } = require("../../models/contact");
const isValidObjectId = require("../../services/mongoIdValidation");

const updateStatusContact = async (contactId, body) => {
  if (!isValidObjectId(contactId)) {
         return null;
    }
  const updatedContact = Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
  if (!updatedContact) {
        return null;
    }
  return updatedContact;
}

module.exports = updateStatusContact;