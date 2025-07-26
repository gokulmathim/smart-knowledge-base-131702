//
// Sequelize model for Article entity in the knowledge base.
//
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Article = sequelize.define(
    'Article',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      categoryId: { type: DataTypes.INTEGER },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
      },
      createdById: { type: DataTypes.INTEGER },
    },
    {
      tableName: 'articles',
      timestamps: true,
    }
  );
  return Article;
};
