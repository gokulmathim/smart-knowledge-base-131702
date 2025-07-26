//
// Entry point for all Sequelize models and DB connection for the Knowledge Base backend.
// PUBLIC_INTERFACE
/**
 * Connects to the MySQL DB using environment variables and initializes all models.
 * Exports: { sequelize, models }
 */
const { Sequelize } = require('sequelize');

const FAQModel = require('./faq');
const ArticleModel = require('./article');
const UserModel = require('./user');
const CategoryModel = require('./category');
const TagModel = require('./tag');
const QuestionModel = require('./question');

// DB connection via .env configuration
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_URL,
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// Initialize models
const FAQ = FAQModel(sequelize);
const Article = ArticleModel(sequelize);
const User = UserModel(sequelize);
const Category = CategoryModel(sequelize);
const Tag = TagModel(sequelize);
const Question = QuestionModel(sequelize);

// Associations
FAQ.belongsTo(Category);
FAQ.belongsToMany(Tag, { through: 'FAQTags' });
FAQ.belongsTo(User, { as: 'createdBy' });

Article.belongsTo(Category);
Article.belongsToMany(Tag, { through: 'ArticleTags' });
Article.belongsTo(User, { as: 'createdBy' });

User.hasMany(FAQ, { foreignKey: 'createdById' });
User.hasMany(Article, { foreignKey: 'createdById' });

Question.belongsTo(User, { as: 'askedBy' });
Question.belongsTo(Category, { as: 'category' });

module.exports = {
  sequelize,
  FAQ,
  Article,
  User,
  Category,
  Tag,
  Question,
};
