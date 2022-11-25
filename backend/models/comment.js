module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    'comment',
    {
      content: {
        type: Sequelize.TEXT,
      },
    },
    {
      tableName: 'comment',
      underscored: true,
      allowNull: false,
    }
  );

  Comment.associate = db => {
    db.Comment.belongsTo(db.User, { onDelete: 'CASCADE' });
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
};
