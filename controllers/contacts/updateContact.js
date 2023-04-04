const { Contact } = require("../../models/contact");
const isValidObjectId = require("../../services/mongoIdValidation");

const updateContact = async (contactId, body) => {
  if (!isValidObjectId(contactId)) {
         return null;
    }
  const updatedContact = Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
  console.log(updatedContact)
  if (!updatedContact) {
        return null;
    }
  return updatedContact;
}

module.exports = updateContact;