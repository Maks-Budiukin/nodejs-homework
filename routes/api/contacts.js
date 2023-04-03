const express = require('express');
const contactsOperations = require('../../models/contacts');
const schema = require('../../schemas/contactSchemas');

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
      const contacts = await contactsOperations.listContacts();
      res.json({
        status: "success",
        code: 200,
        result: contacts,
      })
    } catch (error) {
      next(error);
    }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsOperations.getContactById(contactId);

    if (!contactById) {
      const error = new Error(`Contact with ID "${contactId}" not found!`);
      error.status = 404;
      throw error;
    }

    res.json({
        status: "success",
        code: 200,
        result: contactById,
      })

  } catch (error) {
    next(error);
  }

  
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = schema.add.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await contactsOperations.addContact(body);
    
    res.status(201).json({
        status: "success",
        code: 201,
        result: newContact,
      })
    
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact with ID "${contactId}" not found!`);
      error.status = 404;
      throw error;
    }
    res.json({
        status: "success",
        code: 200,
        message: `Contact with ID ${result.id} was deleted!`,
        deletedContact: result,
      })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = schema.update.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, body);
    res.json({
        status: "success",
        code: 200,
        message: `Contact with ID ${result.id} was updated!`,
        updatedContact: result,
      })
  } catch (error) {
    next(error);
  }
})

module.exports = router
