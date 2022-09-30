module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(15),
      },
      subject: {
        type: Sequelize.STRING(30),
      },
    },
    {
      tableName: 'user',
    }
  );

  return User;
};
