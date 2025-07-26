const { Article, Category, Tag, User } = require('../models');

/**
 * PUBLIC_INTERFACE
 * Article CRUD services
 */

async function getAllArticles(query) {
  const where = {};
  if (query.status) where.status = query.status;
  if (query.categoryId) where.categoryId = query.categoryId;
  // TODO: filter by tag
  return Article.findAll({
    where,
    include: [{ model: Category }, { model: Tag }, { model: User, as: 'createdBy' }],
    order: [['createdAt', 'DESC']],
  });
}

async function getArticleById(id) {
  const article = await Article.findByPk(id, {
    include: [{ model: Category }, { model: Tag }, { model: User, as: 'createdBy' }],
  });
  if (!article) throw new Error('Article not found');
  return article;
}

async function createArticle(data, userId) {
  const article = await Article.create({ ...data, createdById: userId });
  if (data.tagIds) await article.setTags(data.tagIds);
  return getArticleById(article.id);
}

async function updateArticle(id, data, userId, isAdmin) {
  const article = await Article.findByPk(id);
  if (!article) throw new Error('Article not found');
  if (!isAdmin && article.createdById !== userId) throw new Error('Forbidden');
  await article.update(data);
  if (data.tagIds) await article.setTags(data.tagIds);
  return getArticleById(article.id);
}

async function deleteArticle(id, userId, isAdmin) {
  const article = await Article.findByPk(id);
  if (!article) throw new Error('Article not found');
  if (!isAdmin && article.createdById !== userId) throw new Error('Forbidden');
  await article.destroy();
  return { success: true };
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
