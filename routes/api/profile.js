const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// GET api/profile/me
// Get current users profile
// private

//route for get me the profile, need to have the auth - the token.
//***req.user.id - pulling the user ID from the decoded tokens payload
router.get('/me', auth, async (req, res) => {
  try {
    //checking if there is a profile in the db where the user field matches the id of the authenticated user
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//route for create the profile

// POSTT api/profile/me
// create / uppdate user profile
// private

//***req.user.id - pulling the user ID from the decoded tokens payload
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location; // Add the 'location' field to the profileFields object
    if (bio) profileFields.bio = bio; // Add the 'bio' field to the profileFields object
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update

        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create profile - if dont have profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET api/profile/
// Get all profiles
// public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET api/profile/user/user_id
// Get spetsific profile
// public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Oops, profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Oops, profile not found' });
    }

    res.status(500).send('Server Error');
  }
});

// DELETE api/profile
// delete profile ,user, post
// private

router.delete('/', auth, async (req, res) => {
  try {
    // ****add remove users posts here ****

    // remove profile
    await Profile.findOneAndDelete({
      user: req.user.id, // Use req.user.id instead of req.user_id
    });

    // remove user
    await User.findOneAndDelete({
      _id: req.user.id, // Use req.user.id instead of req.user_id
    });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Oops, profile not found' });
    }

    res.status(500).send('Server Error');
  }
});

// PUT api/profile/experience
// add profile expirience
// private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if profile exists
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }

      const { title, company, location, from, to, current, description } =
        req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//del expirence

// DELETE api/profile/experience
// delete expirence from profile
// private

router.delete(
  '/experience/:exp_id',

  auth,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if profile exists
      const profile = await Profile.findOne({ user: req.user.id });
      // get index

      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//ADD EDUCATION

// PUT api/profile/educaiton
// add profile educaiton
// private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
      check('fieldofstudy', 'Field is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if profile exists
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }

      const { school, degree, fieldofstudy, from, to, current, description } =
        req.body;

      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };

      // Add education to the beginning of the array
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//del educaiton

// DELETE api/profile/education
// delete education from profile
// private

router.delete(
  '/education/:edu_id',

  auth,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if profile exists
      const profile = await Profile.findOne({ user: req.user.id });
      // get index

      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET api/profile/github/:username
// get user repo for github
// public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }

      if (
        response.statusCode !== 200 ||
        !response.headers['content-type'].includes('application/json')
      ) {
        return res.status(404).json({ msg: 'No GitHub Profile Found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
