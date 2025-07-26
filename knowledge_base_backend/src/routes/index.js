const express = require('express');
const healthController = require('../controllers/health');

const faqRoutes = require('./faq');
const articleRoutes = require('./article');
const authRoutes = require('./auth');
const questionRoutes = require('./question');
const metaRoutes = require('./meta');
const aiSearchRoutes = require('./ai_search');
const userRoutes = require('./user');  // <--- Added

const router = express.Router();

router.get('/', healthController.check.bind(healthController));
router.use('/faqs', faqRoutes);
router.use('/articles', articleRoutes);
router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
router.use('/meta', metaRoutes);
router.use('/ai-search', aiSearchRoutes);
router.use('/', userRoutes); // <--- Add user endpoints to root (for /profile, /users/:id, etc)

module.exports = router;
