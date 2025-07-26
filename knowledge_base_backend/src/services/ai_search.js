const { Op } = require('sequelize');
const { FAQ, Article } = require('../models');

/**
 * PUBLIC_INTERFACE
 * AI Search Service - allows semantic/keyword search over FAQs/articles.
 * If an external LLM/embedding service (e.g., OpenAI) API key is provided in the environment,
 * this module can be extended to use semantic embedding-based search.
 * For MVP, uses a combination of basic text and relevance scoring.
 */

// Utility: Basic keyword-based match with naive scoring
function keywordScore(text, query) {
  if (!text || !query) return 0;
  const loweredText = text.toLowerCase();
  const loweredQuery = query.toLowerCase();
  let score = 0;
  // Score: +3 whole query, +1 per word match
  if (loweredText.includes(loweredQuery)) score += 3;
  const queryWords = loweredQuery.match(/\w+/g) || [];
  queryWords.forEach(word => {
    if (loweredText.includes(word)) score++;
  });
  return score;
}

// PUBLIC_INTERFACE
async function searchKnowledgeBase(query, options = {}) {
  /** 
   * Search FAQs and Articles by query.
   * Returns top matches, ranked by keyword relevance.
   * If external embedding/AI modules configured, will use those instead.
   * @param {string} query - user query string
   * @param {object} options - { limit, externalAIProvider }
   * @returns {Array<{type, id, title, snippet, score, ...}>}
   */
  if (!query || typeof query !== 'string') return [];

  const limit = options.limit || 10;

  // 1. Fetch candidate FAQs/articles (published only)
  const [faqs, articles] = await Promise.all([
    FAQ.findAll({ where: { status: 'published' }, limit: 50 }),
    Article.findAll({ where: { status: 'published' }, limit: 50 }),
  ]);

  // 2. Score candidates by keyword match
  const scoredFaqs = faqs.map(faq => ({
    type: 'faq',
    id: faq.id,
    title: faq.question,
    snippet: faq.answer.slice(0, 100),
    score: keywordScore(`${faq.question} ${faq.answer}`, query),
    data: faq,
  }));

  const scoredArticles = articles.map(article => ({
    type: 'article',
    id: article.id,
    title: article.title,
    snippet: article.content.slice(0, 100),
    score: keywordScore(`${article.title} ${article.content}`, query),
    data: article,
  }));

  let allResults = scoredFaqs.concat(scoredArticles);
  allResults = allResults.filter(r => r.score > 0);

  // 3. [Future] Support external LLM-embedding/semantic search providers here
  // if (options.externalAIProvider && validApiKeyPresent) { ... }

  // 4. Sort by score desc, and pick top N
  allResults.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const topResults = allResults.slice(0, limit);

  // 5. Optionally, return full DB object only when requested
  return topResults.map(({ type, id, title, snippet, score }) => ({
    type,
    id,
    title,
    snippet,
    score,
  }));
}

module.exports = {
  searchKnowledgeBase,
};
