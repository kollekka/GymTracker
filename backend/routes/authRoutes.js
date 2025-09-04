const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const requireAuth = require('../middleware/auth');

router.post('/signup', auth.signup);
router.post('/login', auth.login);
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
