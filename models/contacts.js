const fs = require('fs/promises');
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  
    return contacts;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contactById = contacts.find(item => item.id === contactId);
    if (!contactById) {
        return null;
    }
    return contactById;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactToDelete = contacts.find(item => item.id === contactId);
    if (!contactToDelete) {
          return null;
      }
    const updatedContacts = contacts.filter(item => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
    
    return contactToDelete;
}

const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = { ...body, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
  }
  contacts[idx] = {
    ...contacts[idx],
    ...body
  }
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
