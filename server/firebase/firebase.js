/* eslint-disable import/no-dynamic-require */
const admin = require('firebase-admin');
const dotenv = require('dotenv');

const serviceAccount = require(`${process.cwd()}/service-account.json`);

dotenv.config();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = { storage, bucket };
