module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING(30),
    },
    password: {
      type: Sequelize.STRING(15),
    },
    subject: {
      type: Sequelize.STRING(30),
    },
  });

  return User;
};
