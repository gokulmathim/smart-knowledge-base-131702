//
// Sequelize model for Tag.
//
module.exports = (sequelize) => {
  const { DataTypes } = require('sequelize');
  const Tag = sequelize.define(
    'Tag',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      tableName: 'tags',
      timestamps: false,
    }
  );
  return Tag;
};
