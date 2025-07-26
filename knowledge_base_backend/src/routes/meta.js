const express = require('express');
const metaController = require('../controllers/meta');
const { authenticateJWT, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/categories', metaController.categories.bind(metaController));
router.get('/tags', metaController.tags.bind(metaController));
router.get('/users', authenticateJWT, requireAdmin, metaController.users.bind(metaController));

module.exports = router;
