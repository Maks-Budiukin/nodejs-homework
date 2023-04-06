const express = require('express');
const { contacts: ctrl } = require("../../controllers");
const router = express.Router()
const { auth } = require('../../middlewares/')

router.get('/', auth, ctrl.listContacts)

router.post('/', auth, ctrl.addContact)

router.get('/:contactId', ctrl.getContactById)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', ctrl.updateContact)

router.patch('/:contactId', ctrl.updateStatusContact)

module.exports = router;