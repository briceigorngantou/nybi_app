/* eslint-disable wrap-iife */
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const logger = require('../utils/logger.js');

/** SEQUELIZE SETUP */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME === 'Administrator' ? 'root' : process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.TYPE,
    operatorsAliases: false, // hide errors
    pool: {
      max: process.env.MAX_POOL ? Number(process.env.MAX_POOL) : 5,
      min: process.env.MIN_POOL ? Number(process.env.MIN_POOL) : 0,
      acquire: process.env.ACQUIRE_POOL
        ? Number(process.env.ACQUIRE_POOL)
        : undefined, // Temps maximum, en millisecondes, pendant lequel le pool essaiera d'obtenir une connexion avant de déclencher une erreur
      idle: process.env.IDLE_POOL ? Number(process.env.IDLE_POOL) : undefined // Temps maximum, en millisecondes, pendant lequel une connexion peut être inactive avant d'être libérée.
    }
  }
);
(async function connect() {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Connection has been established successfully.');
    })
    .catch((err) => {
      logger.error('Unable to connect to the database:', err);
    });
})();

module.exports = sequelize;
