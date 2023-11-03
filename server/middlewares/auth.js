/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { responseBody } = require('../utils/shared.js');

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      responseBody(null, 'Access Denied', res, 403);
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    responseBody(null, error.message, res, 500);
  }
};

module.exports = { verifyToken };
