const express = require('express');
const aiSearchController = require('../controllers/ai_search');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /ai-search:
 *   post:
 *     summary: Search knowledge base (AI-powered)
 *     description: Receives a user query and returns relevant FAQ/article entries using keyword or semantic match. Can be extended to use LLM/AI provider in future.
 *     tags:
 *       - search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: The user's query string.
 *     responses:
 *       200:
 *         description: List of relevant results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type: { type: string }
 *                       id: { type: integer }
 *                       title: { type: string }
 *                       snippet: { type: string }
 *                       score: { type: number }
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', aiSearchController.search.bind(aiSearchController));

module.exports = router;
