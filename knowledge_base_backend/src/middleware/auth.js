const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

/**
 * PUBLIC_INTERFACE
 * Express middleware to authenticate requests using JWT in 'Authorization' header.
 * Attaches user object to req.user. Responds 401/403 for invalid/missing token.
 */
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token malformed' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
}

/**
 * PUBLIC_INTERFACE
 * Express middleware to check if user is admin (role === 'admin').
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
  next();
}

module.exports = {
  authenticateJWT,
  requireAdmin,
};
