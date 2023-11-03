/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const logger = require('../utils/logger.js');

dotenv.config();

// function to send email to the user
module.exports.sendingMail = async ({ from, to, subject, text }) => {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text
    };
    // asign createTransport method in nodemailer to a variable
    // service: to determine which email platform to use
    // auth contains the senders email and password which are all saved in the .env
    const Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_SENDER
      }
    });
    console.log(mailOptions);
    logger.info('mails options:', mailOptions);
    // return the Transporter variable which has the sendMail method to send the mail
    // which is within the mailOptions
    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
