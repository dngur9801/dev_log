module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    'post',
    {
      title: {
        type: Sequelize.STRING(100),
      },
      content: {
        type: Sequelize.TEXT,
      },
      writer: {
        type: Sequelize.STRING(50),
      },
      viewCnt: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: 'post',
      underscored: true,
    }
  );

  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
  };

  return Post;
};
