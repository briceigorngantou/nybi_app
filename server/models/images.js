const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.posts.hasMany(images, {
        foreignKey: 'post_id',
        as: 'posts'
      });
    }
  }
  images.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      uploadAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW('YYYY-MM-DD hh:mm:ss'),
        allowNull: false
      },
      fileName: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      typeImage: {
        type: DataTypes.ENUM('profile', 'post'),
        allowNull: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'images'
    }
  );
  return images;
};
