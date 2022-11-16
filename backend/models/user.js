module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING(30),
        // unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
      },
      name: {
        type: Sequelize.STRING(30),
      },
      provider: {
        type: Sequelize.STRING(30),
      },
      profileImage: {
        type: Sequelize.STRING(200),
      },
      blogName: {
        type: Sequelize.STRING(30),
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
