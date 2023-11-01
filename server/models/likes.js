const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(likes, {
        foreignKey: 'user_id',
        as: 'likes'
      });
      models.posts.hasMany(likes, {
        foreignKey: 'post_id',
        as: 'likes'
      });
    }
  }
  likes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      likeDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'likes'
    }
  );
  return likes;
};
