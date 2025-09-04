const People = require('../models/People');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
};

const sanitizeUser = (u) => ({ id: u._id, name: u.name, email: u.email });

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password too short (min 8)' });
    }
    const existing = await People.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const user = await People.create({ name, email, password });
    return res.status(201).json({ user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await People.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    next(err);
  }
};
