const faqService = require('../services/faq');

/**
 * PUBLIC_INTERFACE
 * Controller for FAQ REST endpoints.
 */
class FAQController {
  async list(req, res, next) {
    try {
      const faqs = await faqService.getAllFAQs(req.query);
      return res.json(faqs);
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const faq = await faqService.getFAQById(req.params.id);
      return res.json(faq);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const faq = await faqService.createFAQ(req.body, req.user.id);
      res.status(201).json(faq);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const isAdmin = req.user.role === 'admin';
      const faq = await faqService.updateFAQ(req.params.id, req.body, req.user.id, isAdmin);
      res.json(faq);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const isAdmin = req.user.role === 'admin';
      const result = await faqService.deleteFAQ(req.params.id, req.user.id, isAdmin);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FAQController();
