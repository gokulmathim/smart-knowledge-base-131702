const questionService = require('../services/question');

/**
 * PUBLIC_INTERFACE
 * Controller for submission and browsing of user questions.
 */
class QuestionController {
  async submit(req, res, next) {
    try {
      const question = await questionService.submitQuestion(
        req.body.content,
        req.user.id,
        req.body.categoryId
      );
      res.status(201).json(question);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const questions = await questionService.getAllQuestions();
      res.json(questions);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new QuestionController();
