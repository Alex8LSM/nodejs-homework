const express = require('express');
const { validateId, auth } = require('../../middlewares');
const {
  getContacts,
  getContactById,
  addContact,
  editContact,
  editContactFavorite,
  deleteContact,
} = require('../../controllers/contacts');
const router = express.Router();

router.get('/', auth, getContacts);
router.get('/:contactId', auth, validateId, getContactById);
router.post('/', auth, addContact);
router.put('/:contactId', auth, validateId, editContact);
router.patch('/:contactId/favorite', auth, validateId, editContactFavorite);
router.delete('/:contactId', auth, validateId, deleteContact);

module.exports = router;
