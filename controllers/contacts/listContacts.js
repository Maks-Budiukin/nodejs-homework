const {Contact} = require("../../models/index")

const listContacts = async () => {
  const contacts = await Contact.find({})
  return contacts;
}

module.exports = listContacts;