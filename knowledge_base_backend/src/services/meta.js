const { Category, Tag, User } = require('../models');

/**
 * PUBLIC_INTERFACE
 * CRUD services for categories and tags, and admin-only user list.
 */

async function getAllCategories() {
  return Category.findAll({ order: [['name', 'ASC']] });
}

async function getAllTags() {
  return Tag.findAll({ order: [['name', 'ASC']] });
}

async function getAllUsers() {
  // Only for admin purpose
  return User.findAll({ order: [['createdAt', 'DESC']], attributes: { exclude: ['passwordHash'] } });
}

module.exports = {
  getAllCategories,
  getAllTags,
  getAllUsers,
};
