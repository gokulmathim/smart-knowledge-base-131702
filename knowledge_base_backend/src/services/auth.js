const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';
const JWT_EXPIRES_IN = '2h';

/**
 * PUBLIC_INTERFACE
 * Registers a new user with email & password.
 */
async function register(email, password, name) {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email in use');
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash: hash, name });
  return user;
}

/**
 * PUBLIC_INTERFACE
 * Authenticates user, returns JWT if credentials valid.
 */
async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Invalid credentials');
  // Exclude hash field from token
  const tokenUser = { id: user.id, email: user.email, role: user.role, name: user.name };
  const token = jwt.sign(tokenUser, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token, user: tokenUser };
}

/**
 * PUBLIC_INTERFACE
 * Returns decoded (but verified) JWT user from token.
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
};
