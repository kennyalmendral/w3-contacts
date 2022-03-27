const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json(user);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email address.').isEmail(),
  check('password', 'Password is required.').exists()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) {
        throw err;
      }

      return res.json({ token });
    });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
});

module.exports = router;