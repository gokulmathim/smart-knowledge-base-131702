const aiSearchService = require('../services/ai_search');

/**
 * PUBLIC_INTERFACE
 * Controller for AI-powered search endpoint.
 */
class AISearchController {
  /**
   * POST /ai-search 
   * Body: { query: string }
   * Returns: [{ type, id, title, snippet, score }]
   */
  async search(req, res, next) {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string' || !query.trim()) {
        return res.status(400).json({ error: 'Query must be a non-empty string.' });
      }
      const results = await aiSearchService.searchKnowledgeBase(query, { limit: 10 });
      res.json({ results });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AISearchController();
