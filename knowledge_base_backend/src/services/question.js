const { Question, Category, User } = require('../models');

/**
 * PUBLIC_INTERFACE
 * Create and get questions submitted by end-users.
 */

async function submitQuestion(content, userId, categoryId) {
  return Question.create({ content, askedById: userId, categoryId });
}

async function getAllQuestions() {
  return Question.findAll({
    include: [{ model: Category, as: 'category' }, { model: User, as: 'askedBy' }],
    order: [['createdAt', 'DESC']],
  });
}

module.exports = {
  submitQuestion,
  getAllQuestions,
};
