//
// Sequelize model for Category.
//
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Category = sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      description: { type: DataTypes.STRING },
    },
    {
      tableName: 'categories',
      timestamps: true,
    }
  );
  return Category;
};
