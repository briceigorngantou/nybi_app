const admin = require("firebase-admin");
const serviceAccount = require(`${process.cwd()}/service-account.json`);

const dotenv = require("dotenv");
dotenv.config();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = { storage, bucket };
