const express = require('express');
const { contacts: ctrl } = require("../../controllers");
const { joiAdd, joiUpdate, joiUpdateStatus } = require("../../models/contact");
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
      const contacts = await ctrl.listContacts();
      res.json({
        status: "success",
        code: 200,
        result: contacts,
      })
    } catch (error) {
      next(error);
    }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = joiAdd.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await ctrl.addContact(body);
    
    res.status(201).json({
        status: "success",
        code: 201,
        result: newContact,
      })
    
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await ctrl.getContactById(contactId);

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

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ctrl.removeContact(contactId);
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
    const { error } = joiUpdate.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await ctrl.updateContact(contactId, body);
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

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { body } = req;
    
    const { error } = joiUpdateStatus.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await ctrl.updateStatusContact(contactId, body);
    if (!result) {
      const error = new Error(`Contact with ID "${contactId}" not found!`);
      error.status = 404;
      throw error;
    }
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
