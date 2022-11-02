module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define(
    'image',
    {
      src: {
        type: Sequelize.STRING(200),
      },
    },
    {
      tableName: 'image',
      underscored: true,
      allowNull: false,
    }
  );

  Image.associate = db => {
    db.Image.belongsTo(db.Post);
  };

  return Image;
};
