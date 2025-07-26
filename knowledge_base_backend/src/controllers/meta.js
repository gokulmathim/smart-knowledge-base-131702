const metaService = require('../services/meta');

/**
 * PUBLIC_INTERFACE
 * Controller for category, tag, admin endpoints.
 */
class MetaController {
  async categories(req, res, next) {
    try {
      const categories = await metaService.getAllCategories();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  async tags(req, res, next) {
    try {
      const tags = await metaService.getAllTags();
      res.json(tags);
    } catch (err) {
      next(err);
    }
  }

  async users(req, res, next) {
    try {
      const users = await metaService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new MetaController();
