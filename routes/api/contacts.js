const express = require('express');
const {
  getContacts,
  getContactById,
  addContact,
  editContact,
  editContactFavorite,
  deleteContact,
} = require('../../modules/routerFunc');
const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactById);
router.post('/', addContact);
router.put('/:contactId', editContact);
router.patch('/:contactId/favorite', editContactFavorite);
router.delete('/:contactId', deleteContact);

module.exports = router;
