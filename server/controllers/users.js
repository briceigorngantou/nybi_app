/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const logger = require('../utils/logger.js');
const { sequelize } = require('../models/index.js');
const { sendingMail } = require('../emails/sendMail.js');
const { responseBody } = require('../utils/shared.js');

// Assigning users to the variable User
const User = sequelize.models.users;
const Token = sequelize.models.token;
dotenv.config();
/** REGISTER USERS */
const signUp = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      email,
      phone,
      location,
      occupation,
      password
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordEncrypt = await bcrypt.hash(password, salt);
    const data = {
      userName,
      firstName,
      lastName,
      email,
      phone,
      password: passwordEncrypt,
      salt,
      location,
      occupation
    };
    const userSaved = await User.create(data);

    // if user details is captured
    // create a token with crypto.js
    if (userSaved) {
      const setToken = await Token.create({
        user_id: userSaved.id,
        token: crypto.randomBytes(16).toString('hex')
      });

      // if token is created, send the user a mail
      if (setToken) {
        sendingMail({
          from: process.env.EMAIL_SENDER,
          to: `${email}`,
          subject: 'Account Verification Link',
          text: `Hello, ${firstName} ${lastName} Please verify your email by clicking this link : 
          ${process.env.DNS}:${process.env.PORT}/api/users/verify-email/${userSaved.id}/${setToken.token} `
        });
      } else {
        // if token is not created, send a status 400
        logger.error('token not created');
        responseBody(null, 'token not created', res, 400);
      }
      // send user info
      logger.info('user has been created successfully');
      responseBody(userSaved, null, res, 201);
    } else {
      logger.error('something went wrong');
      responseBody(null, 'Something went wrong', res, 400);
    }
  } catch (error) {
    logger.error(error.message);
    responseBody(null, error, res, 500);
  }
};

/** EMAIL VERIFICATION */
const verifyEmail = async (req, res, err) => {
  try {
    const { token } = req.params;

    // find user by token using
    const userToken = await Token.findOne({
      token,
      where: {
        user_id: req.params.id
      }
    });
    logger.info(userToken);

    // if token doesn't exist, send status 400
    if (!userToken) {
      responseBody(
        'Your verification link may have expired. Please click on resend for verify your Email.',
        null,
        res,
        400
      );
    } else {
      // if token exist, find the user with that token
      const user = await User.findOne({
        where: { id: req.params.id }
      });
      if (!user) {
        logger.error('Unauthorize');
        responseBody(
          null,
          'We were unable to find a user for this verification. Please SignUp!',
          res,
          401
        );
      } else if (user.isVerified) {
        responseBody(
          'User has been already verified. Please Login',
          null,
          res,
          201
        );
      } else {
        // if user is not verified, change the verified to true by updating the field
        const updated = await User.update(
          { isVerified: true },
          {
            where: {
              id: userToken.user_id
            }
          }
        );
        // if not updated send error message
        if (!updated) {
          responseBody(null, err, res, 500);
          // else send status of 200
        } else {
          responseBody(
            'Your account has been successfully verified',
            null,
            res,
            200
          );
        }
      }
    }
  } catch (error) {
    logger.error(error.message);
    responseBody(null, error, res, 500);
  }
};

/** USER SIGN IN */
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // find a user by their userName
    const findByUserName = await User.findOne({
      where: {
        userName
      }
    });
    // if user userName found, compare password with bcrypt
    if (findByUserName) {
      const isSame = await bcrypt.compare(password, findByUserName.password);

      if (isSame) {
        // check if they are verified
        const verified = findByUserName.isVerified;
        if (verified) {
          const token = jwt.sign(
            {
              id: findByUserName.id
            },
            process.env.SECRET_KEY,
            {
              expiresIn: 59 * 60 * 1000 // 59 min
            }
          );

          res.cookie('jwt', token, {
            maxAge: 59 * 60,
            httpOnly: true
          });
          console.log(token);
          logger.info('user are authenticate successfully');
          // send user data
          responseBody({ ...findByUserName.dataValues, token }, null, res, 201);
        } else {
          responseBody(null, 'User not verified', res, 401);
        }
      } else {
        responseBody(null, 'Authentication failed', res, 401);
      }
    } else {
      responseBody(null, 'Authentication failed', res, 401);
    }
  } catch (error) {
    logger.error(error.message);
    responseBody(null, error, res, 500);
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const findOneUser = await User.findOne({ id: userId });
    if (findOneUser) {
      logger.info(findOneUser);
      responseBody(findOneUser, null, res, 200);
    } else {
      responseBody(null, 'User Not found', res, 404);
    }
  } catch (error) {
    logger.error(error);
    responseBody(null, error, res, 500);
  }
};

module.exports = {
  login,
  signUp,
  verifyEmail,
  getUserById
};
