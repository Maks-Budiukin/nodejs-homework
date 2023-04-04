const { Contact } = require("../../models/contact")
const isValidObjectId = require("../../services/mongoIdValidation")

const getContactById = async (contactId) => {
    if (!isValidObjectId(contactId)) {
         return null;
    }
    const contactById = Contact.findById(contactId);
    if (!contactById) {
        return null;
    }
    return contactById;
}

module.exports = getContactById;