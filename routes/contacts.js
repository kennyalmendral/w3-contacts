const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

    return res.json(contacts);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
});

// @route   POST api/contacts
// @desc    Create a new contact
// @access  Private
router.post('/', [auth, [
  check('name', 'Name is required.').notEmpty()
]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, email, phone, type } = req.body;

  try {
    let contactExists = await Contact.findOne({ phone: phone });

    if (contactExists) {
      return res.status(400).json({ message: 'Phone number already exists.' });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();

    return res.json(contact);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
});

// @route   PUT api/contacts/:id
// @desc    Update an existing contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};

  if (name) {
    contactFields.name = name;
  }
  
  if (email) {
    contactFields.email = email;
  }

  if (phone) {
    contactFields.phone = phone;
  }

  if (type) {
    contactFields.type = type;
  }

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    return res.json(contact);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete an existing contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    return res.json({ message: 'Contact was removed successfully.' });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
});

module.exports = router;