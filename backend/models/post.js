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
      view_cnt: {
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
