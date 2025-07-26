const { FAQ, Category, Tag, User } = require('../models');

/**
 * PUBLIC_INTERFACE
 * CRUD and search logic for FAQs
 */

async function getAllFAQs(query) {
  // Simple filter by category/tag/status
  const where = {};
  if (query.status) where.status = query.status;
  if (query.categoryId) where.categoryId = query.categoryId;
  // TODO: filter by tag
  return FAQ.findAll({
    where,
    include: [{ model: Category }, { model: Tag }, { model: User, as: 'createdBy' }],
    order: [['createdAt', 'DESC']]
  });
}

async function getFAQById(id) {
  const faq = await FAQ.findByPk(id, {
    include: [{ model: Category }, { model: Tag }, { model: User, as: 'createdBy' }]
  });
  if (!faq) throw new Error('FAQ not found');
  return faq;
}

async function createFAQ(data, userId) {
  const faq = await FAQ.create({ ...data, createdById: userId });
  if (data.tagIds) {
    await faq.setTags(data.tagIds);
  }
  return getFAQById(faq.id);
}

async function updateFAQ(id, data, userId, isAdmin) {
  const faq = await FAQ.findByPk(id);
  if (!faq) throw new Error('FAQ not found');
  if (!isAdmin && faq.createdById !== userId) throw new Error('Forbidden');
  await faq.update(data);
  if (data.tagIds) await faq.setTags(data.tagIds);
  return getFAQById(faq.id);
}

async function deleteFAQ(id, userId, isAdmin) {
  const faq = await FAQ.findByPk(id);
  if (!faq) throw new Error('FAQ not found');
  if (!isAdmin && faq.createdById !== userId) throw new Error('Forbidden');
  await faq.destroy();
  return { success: true };
}

module.exports = {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
