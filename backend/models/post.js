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
      private: {
        type: Sequelize.STRING(1),
      },
      viewCnt: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'post',
      underscored: true,
    }
  );

  Post.associate = db => {
    db.Post.belongsTo(db.User, { onDelete: 'CASCADE' });
    db.Post.hasMany(db.Comment);
    db.Post.hasOne(db.Image, { onDelete: 'CASCADE' });
    db.Post.belongsToMany(
      db.User,
      { through: 'Like', as: 'Likers' },
      { onDelete: 'CASCADE' }
    );
  };

  return Post;
};
