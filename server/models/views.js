const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(views, {
        foreignKey: 'user_id',
        as: 'views'
      });
      models.posts.hasMany(views, {
        foreignKey: 'post_id',
        as: 'views'
      });
    }
  }
  views.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      viewDate: {
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
      modelName: 'views'
    }
  );
  return views;
};
