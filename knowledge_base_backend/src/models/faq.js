//
// Sequelize model for FAQ entity in the knowledge base.
//
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const FAQ = sequelize.define(
    'FAQ',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      question: { type: DataTypes.STRING, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
      },
      createdById: { type: DataTypes.INTEGER },
    },
    {
      tableName: 'faqs',
      timestamps: true,
    }
  );
  return FAQ;
};
