const contactService = require('../services/contact.service');
const { schema } = require('../models/contacts');
const { createError } = require('./errors');
const { ObjectId } = require('mongoose').Types;

const validateId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.contactId)) {
    throw createError(404, 'Not found');
  }
  next();
};

const getContacts = async (req, res, next) => {
  try {
    const all = await contactService.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);
    if (!contact) {
      throw createError(404, 'Not found');
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.favorite === undefined) body.favorite = false;
    if (!body.name) {
      throw createError(400, `missing required name field`);
    } else if (!body.email) {
      throw createError(400, `missing required email field`);
    } else if (!body.phone) {
      throw createError(400, `missing required phone field`);
    } else {
      const { error } = schema.validate(body);
      if (error) {
        console.log(error);
        throw createError(400, error.message);
      }
      const contact = await contactService.addContact(body);
      res.status(201).json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const editContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const contact = await contactService.updateContact(contactId, body);
    if (Object.keys(body).length === 0) {
      throw createError(400, 'missing fields');
    } else if (!contact) {
      throw createError(404, 'Not found');
    } else {
      const { error } = schema.validate(body);
      if (error) {
        throw createError(400, error.message);
      }
      res.status(200).json(contact);
    }
  } catch (e) {
    next(e);
  }
};

const editContactFavorite = async (req, res, next) => {
  try {
    const body = req.body;
    if (body.favorite === undefined) {
      throw createError(400, 'missing field favorite');
    } else {
      const { contactId } = req.params;
      const contact = await contactService.updateStatusContact(contactId, body);
      if (!contact) {
        throw createError(404, 'Not found');
      } else {
        res.status(200).json(contact);
      }
    }
  } catch (e) {
    next(e);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.removeContact(contactId);
    if (!contact) {
      throw createError(404, 'Not found');
    } else {
      res.status(200).json({ message: 'contact deleted' });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  editContact,
  editContactFavorite,
  deleteContact,
  validateId,
};
