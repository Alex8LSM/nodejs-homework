const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  editContact,
  editContactFavorite,
  deleteContact,
  validateId,
} = require('../../modules/controllers');
const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', validateId, getContactById);
router.post('/', addContact);
router.put('/:contactId', validateId, editContact);
router.patch('/:contactId/favorite', validateId, editContactFavorite);
router.delete('/:contactId', validateId, deleteContact);

module.exports = router;
