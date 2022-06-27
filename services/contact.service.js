const { Contact } = require('../models/contact');

const listContacts = async (userId, query) => {
  const { page, limit, favorite } = query;
  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;
  let findQuery = { owner: userId };

  if (favorite !== undefined) {
    findQuery = { owner: userId, favorite: favorite };
  }
  console.log('favorite', favorite);
  console.log('findQuery', findQuery);
  return Contact.find(findQuery, {}, { skip, limit: +limit }).populate(
    'owner',
    'email'
  );
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const addContact = async (contact, id) => {
  return Contact.create({ ...contact, owner: id });
};

const updateContact = async (contactId, contact) => {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  return Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
