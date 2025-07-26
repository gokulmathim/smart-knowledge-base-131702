const express = require('express');
const questionController = require('../controllers/question');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateJWT, questionController.submit.bind(questionController));
router.get('/', authenticateJWT, questionController.list.bind(questionController));

module.exports = router;
