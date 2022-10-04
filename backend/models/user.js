module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
      },
      subject: {
        type: Sequelize.STRING(30),
      },
      provider: {
        type: Sequelize.STRING(30),
      },
    },
    {
      tableName: 'user',
    }
  );

  return User;
};
