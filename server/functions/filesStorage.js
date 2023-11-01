const multer = require('multer');

/** FILE STORAGE */
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
