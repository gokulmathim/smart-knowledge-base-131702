const express = require('express');
const articleController = require('../controllers/article');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

router.get('/', articleController.list.bind(articleController));
router.get('/:id', articleController.get.bind(articleController));
router.post('/', authenticateJWT, articleController.create.bind(articleController));
router.put('/:id', authenticateJWT, articleController.update.bind(articleController));
router.delete('/:id', authenticateJWT, articleController.remove.bind(articleController));

module.exports = router;
