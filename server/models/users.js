const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.images, {
        foreignKey: 'image_id',
        as: 'images'
      });
    }
  }
  users.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        validate: {
          isEmail: true
        },
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          [Op.regexp]: /^(0|\+33)[1-9]([-.: ]?[0-9]{2}){4}$/
        },
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(200),
        unique: true,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      occupation: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isConnected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'users'
    }
  );
  return users;
};
