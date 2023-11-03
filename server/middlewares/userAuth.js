// importing modules
const logger = require('../utils/logger.js');
const sequelize = require('../models/index.js');
const { responseBody } = require('../utils/shared.js');

// Function to check if username, phone or email already exist in the database
// this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  // search the database to see if user exist
  try {
    const username = await sequelize.users.findOne({
      where: {
        userName: req.body.userName
      }
    });
    // if username exist in the database respond with a status of 409
    if (username) {
      logger.warn('username already taken');
      responseBody(null, 'userName already taken', res, 409);
    }

    // checking if email already exist
    const emailcheck = await sequelize.users.findOne({
      where: {
        email: req.body.email
      }
    });

    // if email exist in the database respond with a status of 409
    if (emailcheck) {
      logger.warn('Authentication failed');
      responseBody(null, 'Authentication failed', res, 409);
    }
    next();
  } catch (error) {
    logger.error(error);
    responseBody(null, error, res, 500);
  }
};

// exporting module
module.exports = {
  saveUser
};
