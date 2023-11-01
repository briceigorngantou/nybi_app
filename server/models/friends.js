const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(friends, {
        foreignKey: 'user_id',
        as: 'friends'
      });
      models.users.hasMany(friends, {
        foreignKey: 'friend_id'
      });
    }
  }
  friends.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      subscribeDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'friends'
    }
  );
  return friends;
};
