const articleService = require('../services/article');

/**
 * PUBLIC_INTERFACE
 * Controller for Article REST endpoints.
 */
class ArticleController {
  async list(req, res, next) {
    try {
      const articles = await articleService.getAllArticles(req.query);
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const article = await articleService.getArticleById(req.params.id);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const article = await articleService.createArticle(req.body, req.user.id);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const isAdmin = req.user.role === 'admin';
      const article = await articleService.updateArticle(req.params.id, req.body, req.user.id, isAdmin);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const isAdmin = req.user.role === 'admin';
      const result = await articleService.deleteArticle(req.params.id, req.user.id, isAdmin);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();
