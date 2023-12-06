const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// api/auth
// auth route
// public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST api/auth
// authenticate user and get the token
// public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    //accses the data with req.body
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials',
            },
          ],
        });
      }

      // Return jsonwebtoken (for frontend)
      const payload = {
        user: {
          id: user.id,
        },
      };

      //*******change befor deploy to 1 hour
      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send('User registerd');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
