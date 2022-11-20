module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING(30),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      nickName: {
        type: Sequelize.STRING(30),
      },
      name: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      introduce: {
        type: Sequelize.STRING(50),
      },
      provider: {
        type: Sequelize.STRING(30),
      },
      profileImage: {
        type: Sequelize.STRING(200),
      },
    },
    {
      tableName: 'user',
      underscored: true,
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
  };

  return User;
};
