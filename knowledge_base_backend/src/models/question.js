//
// Sequelize model for submitted Question entity.
//
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Question = sequelize.define(
    'Question',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: false },
      askedById: { type: DataTypes.INTEGER },
      categoryId: { type: DataTypes.INTEGER },
      status: {
        type: DataTypes.ENUM('pending', 'answered', 'archived'),
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'questions',
      timestamps: true,
    }
  );
  return Question;
};
