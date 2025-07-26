const express = require('express');
const userController = require('../controllers/user');
const { authenticateJWT, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Self-profile management (user)
router.get('/profile', authenticateJWT, userController.me.bind(userController));
router.put('/profile', authenticateJWT, userController.updateMe.bind(userController));
router.delete('/profile', authenticateJWT, userController.deleteMe.bind(userController));

// Admin user management (admin only)
router.get('/users/:id', authenticateJWT, requireAdmin, userController.get.bind(userController));
router.put('/users/:id', authenticateJWT, requireAdmin, userController.update.bind(userController));
router.delete('/users/:id', authenticateJWT, requireAdmin, userController.remove.bind(userController));
router.patch('/users/:id/role', authenticateJWT, requireAdmin, userController.setRole.bind(userController));
router.patch('/users/:id/status', authenticateJWT, requireAdmin, userController.setStatus.bind(userController));

module.exports = router;
